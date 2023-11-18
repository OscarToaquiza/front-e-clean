import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class CabeceraRutaService{

    constructor( private http: HttpClient){
    }


    saveRutaCompleta( form, listaPuntos ){
        let data = {
            dataCabecera: form,
            listaPuntosGeograficos:listaPuntos
        }
        return this.http.post( `${base_url}/cabecera-ruta/crear`, data);
    }

    // updateTramite( tramite: TramiteModel, id: string ){
    //   return this.http.put( `${base_url}/tramite/${id}`, tramite );
    // }

    getRutasCreadas(desde: number = 0) {
      return this.http.get( `${base_url}/cabecera-ruta?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.rutas
        )
      );
    }

    getRutaCompleta( id: string){
      return this.http.get( `${base_url}/cabecera-ruta/${id}` ).pipe(
        map(
          (resp:any) => resp.ruta
        )
      );
    }

    
    // deleteTramite( id: string){
    //   return this.http.delete( `${base_url}/tramite/${id}`);
    // }

}