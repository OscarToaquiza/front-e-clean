import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { LugarService } from 'src/app/services/lugar.service';
import { AlmacenajeResiduoService } from 'src/app/services/alamcenajeResiduos.service';
import { EmpresaRecicladoraService } from 'src/app/services/empresaRecicladora.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
    selector: 'app-principal-map',
    templateUrl: './principal-map.component.html'
})
export class PrincipalMapComponent implements OnInit {

    public mapa: Mapboxgl.Map;

    public listPoints;
    public idLugar = 0;
    public nombreSector = "";
    public numeroContenedores = 0;
    public numeroEmpresas = 0;
    public numeroNotificacionesHoy = 0;
    public numeroNotificacionesSemana = 0;

    public mostrarGrafica = false;

    // Promedio
    public promedioSemana = 0;

    public puntosEjeX;
    public puntosEjeY;

    public fechasSemana;
    public fechaHoy;

    // Marcadores D-S
    public listMarkerDefault;

    public listMarkerDomingo;
    public listMarkerLunes;
    public listMarkerMartes;
    public listMarkerMiercoles;
    public listMarkerJueves;
    public listMarkerViernes;
    public listMarkerSabado;

    //Colores de barras
    public listaColoresBarra;
    public listaColoresBarraHover;

    //
    public puntoEjeYResueltos;

    constructor(
        private lugarService: LugarService,
        private almacenajeResiduosService: AlmacenajeResiduoService,
        private empresasService: EmpresaRecicladoraService,
        private notificacionService: NotificationsService,
        private activateRoute: ActivatedRoute,
    ) {
        (Mapboxgl as any).accessToken = environment.mapBoxKey;
        this.listPoints = new Array;
        this.listaColoresBarra = new Array;
        this.listaColoresBarraHover = new Array;
    }

    ngOnInit(): void {
        this.idLugar = this.activateRoute.snapshot.params.id;
        this.nombreSector = this.activateRoute.snapshot.params.nombre;
        this.cargarInfo(this.idLugar);
    }

    async cargarInfo(idLugar) {
        if (idLugar != '0') {
            await this.lugarService.getPuntosGeograficosLugar(idLugar).subscribe(
                (resp:any) => {
                    resp.puntos.map(
                        e => {
                            let p = [parseFloat(e.longitud), parseFloat(e.latitud)]
                            this.listPoints.push(p);
                        }
                    );
                    this.fechaHoy = resp.fecha;
                    this.cargarMapa(this.listPoints);
                },
                (e) => console.error(e)
            );
        } else {
            console.log("No ha seleccionado un sector");
        }
    };

    cargarMapa(puntos) {

        let lon = this.calculoPuntoMedio(puntos[0][0], puntos[2][0]);
        let lat = this.calculoPuntoMedio(puntos[0][1], puntos[2][1]);

        this.mapa = new Mapboxgl.Map({
            container: 'mapa-mapbox-principal',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lon, lat], // LNG , LAT
            zoom: 15, // starting zoom
            pitch: 0
        });

        this.dibujarSector();
        this.dibujarContenedores();
        this.dibujarEmpresas();
        this.dibujarNotificacionByDia(this.fechaHoy);
        this.getGraficaSemana();
    }

    dibujarContenedores() {

        this.almacenajeResiduosService.getAlmacenajeResiduoBySector(this.idLugar).subscribe(
            resp => {
                this.numeroContenedores = resp.length;
                resp.forEach(contenedor => {

                    let tipo = (contenedor.tipo === 1) ? "Contenedor": "Isla Soterrada";

                    const el = document.createElement('div');
                    el.className = 'marker-contenedor';
                    new Mapboxgl.Marker(el, {
                        draggable: false
                    }).setLngLat([contenedor.longitud, contenedor.latitud])
                        .setPopup(
                            new Mapboxgl.Popup({ offset: 25 })
                                .setHTML(
                                    `
                                        <div class="text-center">
                                            ${contenedor.nombre} / ${tipo} <br>
                                            <a href="/#/epagal/list-containers/mant/${contenedor.id_almacenaje_reciduo}" 
                                            class="btn btn-sm btn-success"><i class="fa fa-eye"></i></a>
                                        </div>
                                        `
                                )
                        ).addTo(this.mapa);
                });
            },
            (e) => console.log(e)
        );

    }

    dibujarEmpresas() {
        this.empresasService.getEmpresaRecicaldorasBySector(this.idLugar).subscribe(
            resp => {
                this.numeroEmpresas = resp.length;
                resp.forEach(empresa => {

                    const el = document.createElement('div');
                    el.className = 'marker-empresa';
                    new Mapboxgl.Marker(el, {
                        draggable: false
                    }).setLngLat([empresa.longitud, empresa.latitud])
                        .setPopup(
                            new Mapboxgl.Popup({ offset: 25 })
                                .setHTML(
                                    `
                                        <div class="text-center">
                                            ${empresa.nombre} <br>
                                            <a href="/#/epagal/list-business/mant/${empresa.id_empresa_recicladora}" 
                                            class="btn btn-sm btn-success"><i class="fa fa-eye"></i></a>
                                        </div>
                                        `
                                )
                        ).addTo(this.mapa);
                });
            },
            (e) => console.log(e)
        );
    }

    /**
     * 
     * @param dia Dia de la semana de 0-7
     */
    dibujarNotificacionByDia(fecha) {
        
        //Inicializar
        this.listMarkerDefault = new Array<Mapboxgl.Marker>(); 

        this.notificacionService.getNotificacionesBySectorAndFecha(this.idLugar, fecha).subscribe(
            resp => {
                if( fecha == this.fechaHoy){
                    this .numeroNotificacionesHoy = resp.length;
                }
                resp.forEach(notificacion => {
                    const el = document.createElement('div');
                    el.className = 'marker-notificacion';
                    let marcador = new Mapboxgl.Marker(el, {
                        draggable: false
                    }).setLngLat([notificacion.longitud, notificacion.latitud])
                        .setPopup(
                            new Mapboxgl.Popup({ offset: 25 })
                                .setHTML(
                                    `
                                        <div class="text-center">
                                            ${notificacion.nombre} - ${fecha} <br>
                                            <a href="/#/epagal/home/view-mapa/notification/${notificacion.id_notificacion_problema}" 
                                            class="btn btn-sm btn-success"><i class="fa fa-eye"></i></a>
                                        </div>
                                        `
                                )
                        ).addTo(this.mapa);

                          //SOLO DE HOY NOSE EL DIA.
                    this.listMarkerDefault.push(marcador);
                });
            },
            (e) => console.log(e)
        );
    }

    getGraficaSemana() {

        this.puntosEjeX = new Array();
        this.puntosEjeY = new Array();
        this.puntoEjeYResueltos = new Array();

        this.notificacionService.getNotificacionesBySectorFecha(this.idLugar).subscribe(
            (resp: any) => {
                this.numeroNotificacionesSemana = 0;
                //console.log(resp);
                for (const detalle of resp.lista) {
                    this.puntosEjeX.push(detalle.fecha);
                    this.puntosEjeY.push(detalle.numeroNotificaciones);
                    this.puntoEjeYResueltos.push(detalle.numeroNotificacionesResueltas);
                    this.numeroNotificacionesSemana = this.numeroNotificacionesSemana + detalle.numeroNotificaciones + detalle.numeroNotificacionesResueltas;
                }
                this.promedioSemana = this.numeroNotificacionesSemana / 7;

                //fechas semana
                this.armarBotonesSemana(this.puntosEjeX, this.puntosEjeY, this.puntoEjeYResueltos);
                this.armarColoresGrafica(this.puntosEjeY);

                this.puntosEjeX = [
                    'Domingo,' + this.puntosEjeX[0],
                    'Lunes,' + this.puntosEjeX[1],
                    'Martes,' + this.puntosEjeX[2],
                    'Miercoles,' + this.puntosEjeX[3],
                    'Jueves,' + this.puntosEjeX[4],
                    'Viernes,' + this.puntosEjeX[5],
                    'Sabado,' + this.puntosEjeX[6],
                ];

                this.mostrarGrafica = true;


            },
            (e) => console.log(e)
        );

    }

    /**
     *  0-3 VERDE    Colores = #1abb9c,#26b99a
        4-9 AMARILLO Colores = #fff537,#eade00
        10 > ROJO    Colores = #ff0000,#e00000
     * @param valores 
     */
    private armarColoresGrafica(valores){

        for (let x = 0; x < valores.length; x++) {
            
            if( valores[x] <= 3 ){
                this.listaColoresBarra.push('#1abb9c');
                this.listaColoresBarraHover.push('#26b99a');
            }else if( valores[x] >= 4  && valores[x] <=9 ){
                this.listaColoresBarra.push('#fff537');
                this.listaColoresBarraHover.push('#eade00');
            }else{
                this.listaColoresBarra.push('#ff0000');
                this.listaColoresBarraHover.push('#e00000');
            }
            
        }

    }

    /**
     * Armar los dias de la semana.
     * @param dias 
     * @param valores 
     */
    private armarBotonesSemana(dias, valores, valoresSuma) {

        this.fechasSemana = [
            {
                dia: `Domingo....#N = ${(valores[0]+valoresSuma[0])}`,
                fecha: dias[0],
                tachar: ((valores[0] + valoresSuma[0]) === 0) ? true : false,
                esHoy: (dias[0] === this.fechaHoy) ? true : false
            },
            {
                dia: `Lunes.........#N = ${( valores[1] + valoresSuma[1])}`,
                fecha: dias[1],
                tachar: (( valores[1] + valoresSuma[1]) === 0) ? true : false,
                esHoy: (dias[1] === this.fechaHoy) ? true : false
            },
            {
                dia: `Martes.......#N = ${( valores[2] + valoresSuma[2])}`,
                fecha: dias[2],
                tachar: (( valores[2] + valoresSuma[2]) === 0) ? true : false,
                esHoy: (dias[2] === this.fechaHoy) ? true : false
            },
            {
                dia: `Miercoles...#N = ${( valores[3] + valoresSuma[3])}`,
                fecha: dias[3],
                tachar: ((valores[3] + valoresSuma[3])=== 0) ? true : false,
                esHoy: (dias[3] === this.fechaHoy) ? true : false
            },
            {
                dia: `Jueves........#N = ${(valores[4] +valoresSuma[4]) }`,
                fecha: dias[4],
                tachar: ((valores[4] +valoresSuma[4])  === 0) ? true : false,
                esHoy: (dias[4] === this.fechaHoy) ? true : false
            },
            {
                dia: `Viernes......#N = ${(valores[5] +valoresSuma[5]) }`,
                fecha: dias[5],
                tachar: ((valores[5] + valoresSuma[5])  === 0) ? true : false,
                esHoy: (dias[5] === this.fechaHoy) ? true : false
            },
            {
                dia: `Sabado.......#N = ${(valores[6] + valoresSuma[6] )}`,
                fecha: dias[6],
                tachar: ((valores[6] + valoresSuma[6] ) === 0) ? true : false,
                esHoy: (dias[6] === this.fechaHoy) ? true : false
            }
        ];

        this.verificarDiaFechaListNotificaciones(dias);

    }

    public verificarDiaFechaListNotificaciones(dias) {

        let diaNumero: number;
        dias.forEach((dia, i) => {
            if (dia === this.fechaHoy) {
                diaNumero = i;
            }
        });

        this.llenarArrayDiaNuemro( diaNumero);

    }

    llenarArrayDiaNuemro( diaNumero){

        switch (diaNumero) {
            case 0:
                this.listMarkerDomingo = this.listMarkerDefault;
                break;
            case 1:
                this.listMarkerLunes = this.listMarkerDefault;
                break;
            case 2:
                this.listMarkerMartes = this.listMarkerDefault;
                break;
            case 3:
                this.listMarkerMiercoles = this.listMarkerDefault;
                break;
            case 4:
                this.listMarkerJueves = this.listMarkerDefault;
                break;
            case 5:
                this.listMarkerViernes = this.listMarkerDefault;
                break;
            case 6:
                this.listMarkerSabado = this.listMarkerDefault;
                break;
        }

    }

    dibujarSector() {

        this.mapa.on('load', () => {
            this.mapa.addLayer({
                id: 'mapa-sector',
                type: 'fill',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Polygon',
                            coordinates: [this.listPoints]
                        }
                    }
                },
                layout: {},
                paint: {
                    'fill-color': '#0080ff',
                    'fill-opacity': 0.5
                }
            });

        });

    };

    
    async getStatus( event , pos, fecha){

        let evento = event.target.checked;
        //Si el event es false, debo quitar la notificacion en base a la posicion que representa el dia
        if(evento === false){
            
            this.quitarNotificacionesMapa(pos);
        } else {
            //Si el event es true, debo mostrar las notificaciones en base al dia, se debe llamar el endpoint con la fecha.
            
            await this.dibujarNotificacionByDia(fecha);
            this.llenarArrayDiaNuemro( pos );
            //console.log(this.listMarkerDefault);
        }
    }

    public quitarNotificacionesMapa(pos){

        switch (pos) {
            case 0:
                this.listMarkerDomingo.forEach( marcador => marcador.remove() );
                this.listMarkerDomingo = null;
                break;
            case 1:
                this.listMarkerLunes.forEach( marcador => marcador.remove() );
                this.listMarkerLunes = null;
                break;
            case 2:
                this.listMarkerMartes.forEach( marcador => marcador.remove() );
                this.listMarkerMartes = null;
                break;
            case 3:
                this.listMarkerMiercoles.forEach( marcador => marcador.remove() );
                this.listMarkerMiercoles = null;
                break;
            case 4:
                this.listMarkerJueves.forEach( marcador => marcador.remove() );
                this.listMarkerJueves = null;
                break;
            case 5:
                this.listMarkerViernes.forEach( marcador => marcador.remove() );
                this.listMarkerViernes = null;
                break;
            case 6:
                this.listMarkerSabado.forEach( marcador => marcador.remove() );
                this.listMarkerSabado = null;
                break;
        }

    }
    
    
    /**
     * Calculo del punto medio para centrar mapa.
     * @param p1 
     * @param p2 
     * @returns 
     */
    calculoPuntoMedio(p1, p2) {
        return ((p1 + p2) / 2);
    }


}
