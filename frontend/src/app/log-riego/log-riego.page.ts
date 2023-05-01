/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { Logs } from '../model/logRiegos';
import { DispositivoService } from '../services/dispositivo.service';
import { LogsService } from '../services/logRiegos.service';

@Component({
  selector: 'app-log',
  templateUrl: './log-riego.page.html',
  styleUrls: ['./log-riego.page.scss'],
})
export class LogRiegoPage implements OnInit {
  public dispositivo: Dispositivo;
  public logs: Array<Logs>;
  public idDispositivo: string;
  public electrovalvulaId: string;
  public onError: boolean;

  constructor(private router: ActivatedRoute, private dispService: DispositivoService, private lServ: LogsService) {}

  ngOnInit() {
    this.getLogsData();
  }

  async getLogsData() {
    this.electrovalvulaId = this.router.snapshot.paramMap.get('id');
    try {
      let log = await this.lServ.getLogsValvula(this.electrovalvulaId);
      this.logs = log;
      this.onError = false;
    } catch (error) {
      this.onError = true;
    }
  }
}
