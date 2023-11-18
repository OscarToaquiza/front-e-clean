import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { NoticiaModel } from '../models/BD/notica.model';
import { ProcesoReciclajeModel } from '../models/BD/procesoReciclaje.model';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class ProcesoReciclajeService{

    constructor( private http: HttpClient){
    }


    saveProcesoReciclaje( proceso: ProcesoReciclajeModel ){
        return this.http.post( `${base_url}/proceso-reciclaje/crear`, proceso );
    }

    updateProcesoReciclaje( proceso: ProcesoReciclajeModel, id: string ){
      return this.http.put( `${base_url}/proceso-reciclaje/${id}`, proceso );
    }

    getProcesosReciclaje(desde: number = 0) {
      return this.http.get( `${base_url}/proceso-reciclaje?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.procesos
        )
      );
    }

    getProcesoReciclaje( id: string){
      return this.http.get( `${base_url}/proceso-reciclaje/${id}` ).pipe(
        map(
          (resp:any) => resp.proceso
        )
      );
    }

    
    deleteProcesoReciclaje( id: string){
      return this.http.delete( `${base_url}/proceso-reciclaje/${id}`);
    }

}