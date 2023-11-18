import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { TramiteModel } from '../models/BD/tramite.model';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class TramiteService{

    constructor( private http: HttpClient){
    }


    saveTramite( tramite: TramiteModel ){
        return this.http.post( `${base_url}/tramite/crear`, tramite );
    }

    updateTramite( tramite: TramiteModel, id: string ){
      return this.http.put( `${base_url}/tramite/${id}`, tramite );
    }

    getTramites(desde: number = 0) {
      return this.http.get( `${base_url}/tramite?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.tramites
        )
      );
    }

    getTramite( id: string){
      return this.http.get( `${base_url}/tramite/${id}` ).pipe(
        map(
          (resp:any) => resp.tramite
        )
      );
    }

    
    deleteTramite( id: string){
      return this.http.delete( `${base_url}/tramite/${id}`);
    }

}