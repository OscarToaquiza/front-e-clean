import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { PuntoGeograficoModel } from 'src/app/models/BD/puntoGeografico.model';
import { PuntoGeograficoService } from 'src/app/services/puntoGeografico.service';
import { AlmacenajeResiduosModel } from 'src/app/models/BD/almacenajeResiduos.model';
import { AlmacenajeResiduoService } from 'src/app/services/alamcenajeResiduos.service';

@Component({
    selector: 'app-mant-container',
    templateUrl: './mant-containers.component.html'
})
export class MantContainersComponent implements OnInit {

    public containerForm = this.fb.group({
        nombre: ["", Validators.required],
        capacidad: "",
        tipo: 1,
        estado: true,
        detalle: ""
    });

    public parametroMostrar = false;
    public container: AlmacenajeResiduosModel;
    private puntoGeografico: PuntoGeograficoModel;
    public mapa: Mapboxgl.Map;
    public marker;
    public longitudMapa;
    public latitudMapa;

    public tinymceKey = environment.tinymceApiKey;

    constructor(
        private fb: FormBuilder,
        private containerService: AlmacenajeResiduoService,
        private puntoGeograficoService: PuntoGeograficoService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getParametro();
    }

    crearMarcador(lng: number, lat: number) {
        this.marker = new Mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat])
            .addTo(this.mapa);

        this.marker.on('drag', () => {
            this.longitudMapa = this.marker.getLngLat().lng;
            this.latitudMapa = this.marker.getLngLat().lat;
        });

    }

    getParametro() {

        let id = this.activateRoute.snapshot.params.id;

        if (id !== '0') {
            this.parametroMostrar = true;
            this.cargarInfo(id);
        }else{
            this.longitudMapa = environment.lngDefault;
            this.latitudMapa = environment.latDefault;
            this.cargarMapa( this.longitudMapa, this.latitudMapa);
        }

    
    }

    cargarMapa(lon,lat){

        (Mapboxgl as any).accessToken = environment.mapBoxKey;
        this.mapa = new Mapboxgl.Map({
            container: 'mapa-mapbox',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lon, lat], // LNG , LAT
            zoom: 16.5, // starting zoom
            pitch: 60
        });

        this.crearMarcador(lon, lat);
    }

    irAtras() {
        this.router.navigateByUrl("/epagal/list-containers");
    }

    createContainer() {
        if (this.containerForm.valid) {

            let puntoGeografico = new PuntoGeograficoModel();

            puntoGeografico.nombre = this.containerForm.value.nombre;
            puntoGeografico.latitud = this.latitudMapa;
            puntoGeografico.longitud = this.longitudMapa;

            //Primero guardar puntos geograficos

            this.puntoGeograficoService.savePuntoGeografico(puntoGeografico).subscribe(
                (resp: any) => {
                    this.containerForm.value.id_punto_geografico = resp.puntoGeografico.id_punto_geografico;
                    this.containerService.saveAlamcenajeResiduo(this.containerForm.value).subscribe(
                        (resp: any) => {
                            this.containerForm.reset();
                            this.router.navigateByUrl("/epagal/list-containers");
                        }, (e) => console.log(e)
                    );
                },
                (e) => console.error(e)
            );

        }
    }




    editContainer() {
        console.log(this.containerForm.value);
        if (this.containerForm.valid) {
            this.containerService.updateAlamcenajeResiduo(this.containerForm.value,
                this.container.id_almacenaje_reciduo.toString()
            ).subscribe(
                resp => {
                    this.editarPuntoGeografico();
                }, (e) => console.log(e)
            );
        }
    }
    
    editarPuntoGeografico(){
        let puntoGeoEdit = new PuntoGeograficoModel();
        puntoGeoEdit.nombre = this.puntoGeografico.nombre;
        puntoGeoEdit.latitud = this.latitudMapa;
        puntoGeoEdit.longitud = this.longitudMapa;
        this.puntoGeograficoService.updatePuntoGeografico( puntoGeoEdit, this.puntoGeografico.id_punto_geografico.toString()).subscribe(
            resp => {
                this.router.navigateByUrl("/epagal/list-containers");
            },
            (e) => console.log(e)
        );
    }

    cargarInfo(id: string) {
        this.containerService.getAlmacenajeResiduo(id).subscribe(
            resp => {
                console.log(resp);
                this.container = resp;
                let { id_almacenaje_reciduo, id_punto_geografico, ...dataForm } = resp;
                this.containerForm.setValue(
                    dataForm
                );
                this.cargarInfoPuntosGeograficos(this.container.id_punto_geografico);
            },
            e => {
                console.error(e);
                this.router.navigateByUrl("/epagal/list-containers");
            }
        )
    }


    cargarInfoPuntosGeograficos(id){
        this.puntoGeograficoService.getPuntoGeografico(id).subscribe(
            resp => {
                this.puntoGeografico = resp;
                this.latitudMapa = resp.latitud;
                this.longitudMapa = resp.longitud;
                this.cargarMapa( this.longitudMapa, this.latitudMapa);
            },
            (e) => console.log(e)
        )
    }


}
