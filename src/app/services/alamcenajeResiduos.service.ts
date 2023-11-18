import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { AlmacenajeResiduosModel } from '../models/BD/almacenajeResiduos.model';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class AlmacenajeResiduoService{

    constructor( private http: HttpClient){
    }


    saveAlamcenajeResiduo( almacenajeResiduo: AlmacenajeResiduosModel ){
        return this.http.post( `${base_url}/almacenaje-residuos/crear`, almacenajeResiduo  );
    }

    updateAlamcenajeResiduo( almacenajeResiduo: AlmacenajeResiduosModel, id: string ){
      return this.http.put( `${base_url}/almacenaje-residuos/${id}`, almacenajeResiduo );
    }

    getAlamcenajesResiduos(desde: number = 0) {
      return this.http.get( `${base_url}/almacenaje-residuos?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.almacenajesResiduos
        )
      );
    }

    getAlmacenajeResiduo( id: string){
      return this.http.get( `${base_url}/almacenaje-residuos/${id}` ).pipe(
        map(
          (resp:any) => resp.almacenajeResiduo
        )
      );
    }

    getAlmacenajeResiduoBySector( id ){
      return this.http.get( `${base_url}/almacenaje-residuos/sector/${id}` ).pipe(
        map(
          (resp:any) => resp.listaAlmacenajesResiduos
        )
      );
    }

    getTotalContenedores(){
      return this.http.get( `${base_url}/almacenaje-residuos/total/contenedores`);
    }

    

    
    // deleteEmpresaRecicaldora( id: string){
    //   return this.http.delete( `${base_url}/empresa-recicladora/${id}`);
    // }

}