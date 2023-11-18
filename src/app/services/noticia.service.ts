import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { NoticiaModel } from '../models/BD/notica.model';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class NoticiaService{

    constructor( private http: HttpClient){
    }


    saveNoticia( noticia: NoticiaModel ){
        return this.http.post( `${base_url}/noticias/crear`, noticia );
    }

    updateNoticia( noticia: NoticiaModel, id: string ){
      return this.http.put( `${base_url}/noticias/${id}`, noticia );
    }

    getNoticias(desde: number = 0) {
      return this.http.get( `${base_url}/noticias?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.noticias
        )
      );
    }

    getNoticia( id: string){
      return this.http.get( `${base_url}/noticias/${id}` ).pipe(
        map(
          (resp:any) => resp.noticia
        )
      );
    }

    
    deleteNoticia( id: string){
      return this.http.delete( `${base_url}/noticias/${id}`);
    }

}