/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { Medicion } from '../model/medicion';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {



public dispositivo: Dispositivo;
public idDispositivo: string;
public med:  Array<Medicion>;

constructor(private router: ActivatedRoute, private dServ: DispositivoService, private medServ: MedicionService) { }



 ngOnInit() {
  this.idDispositivo = this.router.snapshot.paramMap.get('id');
  this.dServ.getDispositivo(this.idDispositivo).then((disp)=>{
    this.dispositivo=disp;
  });

  this.medServ.getMedicionesByIdDispositivo(this.idDispositivo).then((med)=>{
    this.med = med;
  });
}

}
