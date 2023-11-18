import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CabeceraRutaService } from 'src/app/services/cabeceraRuta.service';
import { RutaCompleta } from 'src/app/models/interfaces/rutaConpleta.interface';
import { MatDialog } from '@angular/material/dialog';
import { MsgIntructionsComponent } from 'src/app/angular-material/msg-instructions/msg-intructions.component';

@Component({
    selector: 'app-mant-routercar',
    templateUrl: './mant-routercar.component.html',
    styleUrls: ['./mant-router.component.css']
})
export class MantRoutercarComponent implements OnInit {

    public routerCarForm = this.fb.group({
        nombre: ["", Validators.required],
        diasrutas: "",
        horario: null
    });

    public parametroMostrar = false;
    public mapa: Mapboxgl.Map;
    public marker;
    public longitudMapa;
    public latitudMapa;

    public listMarker;
    public listPoints;

    public rutaCompleta: RutaCompleta;

    constructor(
        private fb: FormBuilder,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private cabeceraRuta: CabeceraRutaService,
        private dialog: MatDialog
    ) {
        (Mapboxgl as any).accessToken = environment.mapBoxKey;
    }

    ngOnInit(): void {
        this.getParametro();
    }

    modalPrincipal(){
        this.dialog.open(MsgIntructionsComponent, {
            width: '400px',
            data: { mensaje: "" }
        });
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

        this.listMarker = new Array<Mapboxgl.Marker>();
        this.listPoints = new Array;

        if (id !== '0') {
            this.cargarInfo(id);
            this.parametroMostrar = true;
        } else {
            this.longitudMapa = environment.lngDefault;
            this.latitudMapa = environment.latDefault;
            this.cargarMapa(this.longitudMapa, this.latitudMapa);
            this.modalPrincipal();
        }


    }

    cargarMapa(lon, lat) {

        this.mapa = new Mapboxgl.Map({
            container: 'mapa-mapbox-rutas',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lon, lat], // LNG , LAT
            zoom: 16.5, // starting zoom
            pitch: 60
        });

        //Marcador principal Azul
        this.crearMarcador(lon, lat);
    }

    irAtras() {
        this.router.navigateByUrl("/epagal/list-router-car");
    }

    cargarInfo(id: string) {

        this.cabeceraRuta.getRutaCompleta(id).subscribe(
            resp => {
                //console.log(resp);
                this.rutaCompleta = resp;
                console.log(this.rutaCompleta);
                let { id_cabecera_ruta, detalleruta, ...dataForm } = this.rutaCompleta;
                this.routerCarForm.setValue(dataForm);
                this.agregarMaradoresEstaticos(this.rutaCompleta.detalleruta);

            },
            (e) => console.log(e)
        )
    }

    /**
     * 
     */

    agregarMaradoresEstaticos(detalleruta) {

        //Centrar mapa desde le inicio
        this.mapa = new Mapboxgl.Map({
            container: 'mapa-mapbox-rutas',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [detalleruta[0].punto.longitud, detalleruta[0].punto.latitud], // LNG , LAT
            zoom: 15, // starting zoom
            pitch: 60
        });

        let i = 1;
        detalleruta.forEach(dr => {
            let puntoRutas = new Mapboxgl.Marker({
                draggable: false,
                color: 'black',
            }).setLngLat([dr.punto.longitud, dr.punto.latitud])
                .setPopup(
                    new Mapboxgl.Popup({ offset: 25 })
                        .setHTML(
                            `<p>Marcador ${i}</p>`
                        )
                ).addTo(this.mapa);
            i++;
            this.listMarker.push(puntoRutas);
        });

        this.dibujarRutaVer();

    };

    addMarkerList() {

        // Numero de marcador
        let indexMarker = this.listMarker.length + 1;

        let markerDat = new Mapboxgl.Marker({
            draggable: true,
            color: 'black',
            rotation: -45
        }).setLngLat([this.longitudMapa, this.latitudMapa])
            .setPopup(
                new Mapboxgl.Popup({ offset: 25 })
                    .setHTML(
                        `<p>Marcador ${indexMarker}</p>`
                    )
            ).addTo(this.mapa);

        this.listMarker.push(markerDat);

    }


    dibujarRuta() {

        if (this.mapa.getLayer('ruta-creada') !== undefined) {
            this.mapa.removeLayer('ruta-creada');
            this.mapa.removeSource('route');
            this.listPoints = new Array();
        }

        this.listMarker.map(
            e => {
                //console.log(e.getLngLat().lng);
                let p = [e.getLngLat().lng, e.getLngLat().lat]
                this.listPoints.push(p);
            }
        );

        this.mapa.addSource('route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: this.listPoints
                }
            }
        });

        this.mapa.addLayer({
            id: 'ruta-creada',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': 'red',
                'line-width': 5
            }
        });
    }


    dibujarRutaVer() {

        this.listMarker.map(
            e => {
                let p = [e.getLngLat().lng, e.getLngLat().lat]
                this.listPoints.push(p);
            }
        );

        this.mapa.on('load', () => {
            this.mapa.addLayer({
                id: 'ruta-creada',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: this.listPoints
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': 'blue',
                    'line-width': 7
                }
            });
        });

    }


    createRouterCar() {
        this.cabeceraRuta.saveRutaCompleta(this.routerCarForm.value, this.listPoints).subscribe(
            resp => {
                this.router.navigateByUrl("/epagal/list-router-car");
            },
            (e) => console.log(e)
        );
    }



}
