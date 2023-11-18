import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class LugarService{

    constructor( private http: HttpClient){
    }

    getLugares(){
      return this.http.get( `${base_url}/lugar` ).pipe(
        map
        (
          (resp:any) => resp.lugares
        )
      );
    }

  
    getPuntosGeograficosLugar( id: string){
        return this.http.get( `${base_url}/lugar-punto-geografico/${id}` );
      }
  

}