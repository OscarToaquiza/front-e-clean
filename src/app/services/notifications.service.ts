import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class NotificationsService{

    constructor( private http: HttpClient){
    }

    getNotificaciones(desde: number = 0) {
      return this.http.get( `${base_url}/notificacion-problema/tabla/lista?desde=${desde}` ).pipe(
        map(
        (resp:any) => resp.notificaciones
        )
      );
    }

    getNotificacion( id: string){
      return this.http.get( `${base_url}/notificacion-problema/${id}` ).pipe(
        map(
          (resp:any) => resp.notificacion[0]
        )
      );
    }

    // Mapa principal
    getNotificacionesBySector( id ){
      return this.http.get( `${base_url}/notificacion-problema/sector/${id}` ).pipe(
        map(
          (resp:any) => resp.listaNotificaciones
        )
      );
    }

    getNotificacionesBySectorAndFecha( id,fecha ){
      return this.http.get( `${base_url}/notificacion-problema/sector/fecha/semana/dia?id=${id}&fecha=${fecha}` ).pipe(
        map(
          (resp:any) => resp.listaNotificaciones
        )
      );
    }

    getNotificacionesBySectorFecha( id ){
      return this.http.get( `${base_url}/notificacion-problema/sector/semana/${id}`);
    }

    getNotificacionesHoy(){
      return this.http.get( `${base_url}/notificacion-problema/fecha-actual/general`);
    }

    getNotificacionReporte( id_lugar = null, fecha_inicio = null, fecha_fin = null){
      let data = {
        id_lugar,
        fecha_inicio,
        fecha_fin
      }
      return this.http.post( `${base_url}/notificacion-problema/reporte/notificacion`, data );
    }

    
    changeEstado( id,estado ){
      let data = {
        id_notificacion: id,
        estado
      }
      return this.http.patch( `${base_url}/notificacion-problema/cambiar/estado`, data );
    }
    
    // deleteNoticia( id: string){
    //   return this.http.delete( `${base_url}/noticias/${id}`);
    // }

}