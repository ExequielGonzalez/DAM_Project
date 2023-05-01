import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Dispositivo } from '../model/dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../model/medicion';
import { LogsService } from '../services/logRiegos.service';
import { Logs } from '../model/logRiegos';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { MedicionService } from '../services/medicion.service';
import { ActivatedRoute } from '@angular/router';

import * as Highcharts from 'highcharts';
declare let require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  public dispositivo: Dispositivo = new Dispositivo(0, '', '', 0);
  public estadoEV = false;
  public myChart: any;
  public medicion: Medicion;
  public idDispositivo: string;
  public onError: boolean;
  public onEVError: boolean;
  private chartOptions;
  private chartValue = 0;
  private chartName = '';
  constructor(
    private router: ActivatedRoute,
    private dispService: DispositivoService,
    private medSrv: MedicionService,
    private lSrv: LogsService,
    private evSrv: ElectrovalvulaService,
    private _location: Location
  ) {
    // this.getDispositivoData();
  }
  ionViewWillEnter() {
    this.generarChart();
    this.getDispositivoData();
  }

  ionViewOnLeave() {
    this.myChart.destroy();
    //clean all variables related to the chart
    this.chartOptions = null;
    this.chartValue = 0;
    this.chartName = '';
  }

  async ngOnInit() {}

  async getDispositivoData() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    // debugger;
    try {
      this.onError = false;
      const dipositivo = await this.dispService.getDispositivo(this.idDispositivo);
      this.dispositivo = dipositivo;
      const med = await this.medSrv.getMedicionByIdDispositivo(this.idDispositivo);
      if (med) {
        this.medicion = med;
        this.chartValue = med.valor;
        this.chartName = String(this.dispositivo.nombre);
        this.updateChart();
      } else {
        this.updateChart();
      }
    } catch (error) {
      this.onError = true;
    }
    try {
      this.onEVError = false;
      this.estadoEV = Boolean(await this.evSrv.getEstadoActualEV(this.dispositivo.electrovalvulaId));
    } catch (error) {
      this.onEVError = true;
    }
  }

  cambiarEstadoEV() {
    this.estadoEV = !this.estadoEV;
    const estadoEVn = Number(this.estadoEV);
    const now = new Date(); // <-- New date created to be the same for the new log and the new measument
    const log: Logs = new Logs(0, Number(this.estadoEV), now, this.dispositivo.electrovalvulaId);
    this.lSrv.newEntrada(log);
    // If I close the EV, then I need also to push a Medicion record.
    if (!this.estadoEV) {
      const newMedicion = this.getRandomInt(0, 100);
      const med: Medicion = new Medicion(0, now, newMedicion, this.dispositivo.dispositivoId);
      this.medSrv.agregarMedicion(med);
      this.chartValue = Number(newMedicion);
      this.updateChart();
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  updateChart() {
    this.myChart.update({
      title: {
        // text: [String(this.dispositivo.nombre)]
        text: [this.chartName],
      },
      series: [
        {
          name: 'kPA',
          data: [Number(this.chartValue)],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    });
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '300px',
      },
      title: {
        // text: [String(this.dispositivo.nombre)]
        text: [this.chartName],
      },
      credits: { enabled: false },
      pane: {
        startAngle: -150,
        endAngle: 150,

        center: ['50%', '50%'],
        size: '100%',
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: 'Humedad de Suelo',
        },
        plotBands: [
          {
            from: 0,
            to: 10,
            color: '#000000', // black
          },
          {
            from: 10,
            to: 30,
            color: '#55BF3B', // green
          },
          {
            from: 30,
            to: 60,
            color: '#DDDF0D', // yellow
          },
          {
            from: 60,
            to: 100,
            color: '#DF5353', // red
          },
        ],
      },
      series: [
        {
          name: 'Cb',
          data: [Number(this.chartValue || 0)],
          // data: [Number(this.medicion.valor)],
          tooltip: {
            valueSuffix: ' kPa',
          },
        },
      ],
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions, async (t) => {
      await this.getDispositivoData();
      this.updateChart();
    });
  }
}
