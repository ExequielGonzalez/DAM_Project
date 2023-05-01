import { Component } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listadoDispositivo: Dispositivo[];
  constructor(public dispositivoService: DispositivoService) {
    this.callService();
  }

  async callService() {
    const listado = await this.dispositivoService.getDispositivosList();
    this.listadoDispositivo = listado;
  }


}


