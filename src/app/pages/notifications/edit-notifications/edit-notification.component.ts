import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeeNotificacion } from 'src/app/models/interfaces/seeNotificacion.interface';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MsgConfirmComponent } from 'src/app/angular-material/msg-confirm/msg-confirm.component';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html'
})
export class EditNotificationComponent implements OnInit {

  public parametroMostrar = false;
  public notificacion: SeeNotificacion;
  public mapa: Mapboxgl.Map;
  public marker;

  constructor(
    private notificationService: NotificationsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    (Mapboxgl as any).accessToken = environment.mapBoxKey;
  }

  ngOnInit(): void {
    this.getParametro();
  }

  getParametro() {

    let id = this.activateRoute.snapshot.params.id;
    if (id !== '0') {
      this.cargarInfo(id);
    } else {
      this.router.navigateByUrl("/epagal/home");
    }
  }

  irAtras() {
    this.router.navigateByUrl("/epagal/home");
  }

  cargarInfo(id: string) {
    this.notificationService.getNotificacion(id).subscribe(
      resp => {
        this.notificacion = resp;
        this.cargarMapa(this.notificacion.longitud, this.notificacion.latitud);
      },
      e => {
        console.error(e);
        this.router.navigateByUrl("/epagal/home");
      }
    )
  }

  cargarMapa(lon, lat) {
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

  cambiarEstado( ) {
    let dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '450px',
      data: { mensaje: "Si el problema se ha resulto marque ACEPTAR, caso contrario marque CANCELAR" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {

        this.notificationService.changeEstado(this.notificacion.id_notificacion_problema,2).subscribe(
          resp => {
            this.snakBar.open("Operacion ejecutada con éxito!", '', {
              duration: 3000
            });
            this.irAtras();
          },
          (e) => console.log(e)
        )
      }
    });
  }

}
