import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/electrovalvula';
import { Logs } from '../model/logRiegos';

@Injectable({
  providedIn: 'root'
})


  export class ElectrovalvulaService {
    //logs: Logs = new Logs;
    urlApi='http://localhost:8000/api/v1';

      constructor(private _http: HttpClient ) {
     }

    async getEstadoActualEV(id): Promise<number> {
      try {
        const logs: any = await this._http.get(this.urlApi+'/logs/'+id).toPromise();
        if(logs){
          return logs?.apertura;
        }
        else{
          return 0;
        }
      }
      catch (error)
      {
       console.log('DEBUG - Catched error in GetEstadoActualEV - ' + error);
        return 0;
      }
}
  }
