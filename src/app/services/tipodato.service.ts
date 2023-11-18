import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { TipoDataModel } from '../models/BD/tipoData.model';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class TipoDataService{

    constructor( private http: HttpClient){
    }

    saveTipoDato( tipoDato: TipoDataModel ){
        return this.http.post( `${base_url}/tipo-datos/crear`, tipoDato );
    }

    updateTipoDato( tipoDato: TipoDataModel, id: string ){
      return this.http.put( `${base_url}/tipo-datos/${id}`, tipoDato );
    }

    getTiposDatosActivos(desde: number = 0) {
      return this.http.get( `${base_url}/tipo-datos/activos?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.tiposDatos
        )
      );
    }

    getTiposDatosDesactivados(desde: number = 0) {
        return this.http.get( `${base_url}/tipo-datos/desactivados?desde=${desde}` ).pipe(
          map(
            (resp:any) => resp.tiposDatos
          )
        );
      }

    getTipoDato( id: string){
      return this.http.get( `${base_url}/tipo-datos/${id}` ).pipe(
        map(
          (resp:any) => resp.tipoDato
        )
      );
    }

    
    changeEstadoTipoDato( id: string, estado: boolean){
      return this.http.patch( `${base_url}/tipo-datos/${id}`,{estado});
    }

    getTiposDatosByTipo(desde: number = 0,tipo: string, estado: string) {
        let estadoSend = "true";
        if(estado === "2"){
            estadoSend = "false";
        }
        return this.http.get( `${base_url}/tipo-datos/by/tipo/${tipo}/${estadoSend}?desde=${desde}`).pipe(
          map(
            (resp:any) => resp.tiposDatos
          )
        );
      }

    getAllTiposDatosByTipo(tipo: string) {
      return this.http.get( `${base_url}/tipo-datos/all/by/tipo/${tipo}`).pipe(
        map(
          (resp:any) => resp.tiposDatos
        )
      );
    }

}