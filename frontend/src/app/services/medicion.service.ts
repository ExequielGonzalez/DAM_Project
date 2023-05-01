import { Injectable } from '@angular/core';
import { Medicion } from '../model/medicion';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  urlApi='http://localhost:8000/api/v1';

  constructor(private _http: HttpClient ) {
   }

  getMedicionByIdDispositivo(id): Promise<Medicion>{
    return this._http.get(this.urlApi+'/measure/'+id).toPromise().then((med: Medicion)=>med);
  };

  getMedicionesByIdDispositivo(id): Promise<Medicion[]>{
    return this._http.get(this.urlApi+'/measure/'+id+'/all').toPromise().then((mediciones: Medicion[])=>mediciones);
  };

  // Add a new measurement value into a device.
  // invokes API Endpoint http://localhost:8000/api/v1/measure/add with a medicion variable
  agregarMedicion(medicion: Medicion){
    //return this._http.post(this.urlApi+'/measure/add',{fecha:formatDate(medicion.fecha,'YYYYMMddhhmmss', 'en-US', 'CST' ),valor:medicion.valor,dispositivoId:medicion.dispositivoId}).toPromise().then((result)=>result);
    //return this._http.post(this.urlApi+'/measure/add',{fecha:medicion.fecha.toISOString(),valor:medicion.valor,dispositivoId:medicion.dispositivoId}).toPromise().then((result)=>result);
    return this._http.post(this.urlApi+'/measure/add',{fecha:medicion.fecha.toISOString().slice(0, 19).replace('T', ' '),valor:medicion.valor,dispositivoId:medicion.dispositivoId}).toPromise().then((result)=>result);
   }

}
