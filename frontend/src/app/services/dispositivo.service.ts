
import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class DispositivoService {
  urlApi='http://localhost:8000/api/v1';

  constructor( public _http: HttpClient) { }

  async getDispositivosList(): Promise<Dispositivo[]>{
     // eslint-disable-next-line no-underscore-dangle
     return await this._http.get(this.urlApi+ '/device/').toPromise().then((listado: Dispositivo[])=>listado);
  }



  async getDispositivo(id: any ): Promise<Dispositivo>{
    const dispositivo = await this._http.get(this.urlApi + '/device/' + id).toPromise() as Dispositivo;
    return dispositivo;
  };



}
