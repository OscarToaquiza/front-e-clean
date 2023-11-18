import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeeNotificacion } from 'src/app/models/interfaces/seeNotificacion.interface';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-see-notification',
  templateUrl: './see-notification.component.html'
})
export class SeeNotificationComponent implements OnInit {

  public parametroMostrar = false;
  public notificacion: SeeNotificacion;
  public mapa: Mapboxgl.Map;
  public marker;

  constructor(
    private notificationService: NotificationsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    (Mapboxgl as any).accessToken = environment.mapBoxKey;
   }

  ngOnInit(): void {
    this.getParametro();
  }

  getParametro(){

    let id = this.activateRoute.snapshot.params.id;
    if( id !== '0' ){
      this.cargarInfo(id);
    }else{
        this.router.navigateByUrl("/epagal/list-notifications");
    }
  }

  irAtras(){
    this.router.navigateByUrl("/epagal/list-notifications");
  }

  cargarInfo(id:string){
    this.notificationService.getNotificacion(id).subscribe(
      resp => {
        this.notificacion = resp;
        this.cargarMapa(this.notificacion.longitud, this.notificacion.latitud);
      },
      e => {
        console.error(e);
        this.router.navigateByUrl("/epagal/list-notifications");
      }
    )
  }

  cargarMapa(lon,lat){
      this.mapa = new Mapboxgl.Map({
        container: 'mapa-notificacion',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat], // LNG , LAT
        zoom: 16.5, // starting zoom
        pitch: 60
      });
      this.crearMarcador(lon, lat);
  }

  crearMarcador(lng: number, lat: number) {

    this.marker = new Mapboxgl.Marker({
        draggable: false
    }).setLngLat([lng, lat])
        .addTo(this.mapa);

    this.parametroMostrar = true;

}

}
