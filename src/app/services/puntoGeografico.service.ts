import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { PuntoGeograficoModel } from '../models/BD/puntoGeografico.model';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class PuntoGeograficoService{

    constructor( private http: HttpClient){
    }

    savePuntoGeografico( puntoGeografico: PuntoGeograficoModel ){
        return this.http.post( `${base_url}/punto-geografico/crear`, puntoGeografico );
    }

    updatePuntoGeografico( puntoGeografico: PuntoGeograficoModel, id: string ){
      return this.http.put( `${base_url}/punto-geografico/${id}`, puntoGeografico );
    }

    getPuntosGeograficos(desde: number = 0) {
      return this.http.get( `${base_url}/punto-geografico?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.puntoGeograficos
        )
      );
    }

    getPuntoGeografico( id: string){
      return this.http.get( `${base_url}/punto-geografico/${id}` ).pipe(
        map(
          (resp:any) => resp.puntoGeografico
        )
      );
    }

    
    // deletePuntoGeografico( id: string){
    //   return this.http.delete( `${base_url}/PuntoGeograficos/${id}`);
    // }

}