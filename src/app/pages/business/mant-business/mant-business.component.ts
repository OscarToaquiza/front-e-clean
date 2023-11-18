import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaRecicladoraModel } from 'src/app/models/BD/empresaRecicladora.model';
import { EmpresaRecicladoraService } from 'src/app/services/empresaRecicladora.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { PuntoGeograficoModel } from 'src/app/models/BD/puntoGeografico.model';
import { PuntoGeograficoService } from 'src/app/services/puntoGeografico.service';
import { TipoDataModel } from 'src/app/models/BD/tipoData.model';
import { TipoDataService } from 'src/app/services/tipodato.service';
import { EmpresaTiposDesperdicios } from 'src/app/models/interfaces/empresaTiposDesperdicio.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-mant-business',
    templateUrl: './mant-business.component.html',
    styleUrls: ['./mant-business.component.css']
})

export class MantBusinessComponent implements OnInit {

    public businessForm = this.fb.group({
        nombre: ["", Validators.required],
        direccion: ["", Validators.required],
        detalle: "",
        telefono: ""
    });

    public tinymceKey = environment.tinymceApiKey;

    public parametroMostrar = false;
    public business: EmpresaRecicladoraModel;
    private puntoGeografico: PuntoGeograficoModel;
    public mapa: Mapboxgl.Map;
    public marker;
    public longitudMapa;
    public latitudMapa;

    public listaDesperdiciosSelect: TipoDataModel[];
    public listaTiposDesperdicios;
    public listaTiposDesperdiciosForm;

    constructor(
        private fb: FormBuilder,
        private businessService: EmpresaRecicladoraService,
        private puntoGeograficoService: PuntoGeograficoService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private tipoDatoService: TipoDataService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getParametro();
        this.cargarTiposDato();
    }

    /**
     * Cargar tipos de datos activos "3" = Desperdicios
     * Sin paginación
     */
    cargarTiposDato(){
        this.tipoDatoService.getAllTiposDatosByTipo("3").subscribe(
            resp => {
                //console.log(resp);
                this.listaDesperdiciosSelect = resp;
            },
            (e) => console.log(e)
        );
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
            this.listaTiposDesperdicios = new Array<string>();
            this.listaTiposDesperdiciosForm =  new Array<EmpresaTiposDesperdicios>();
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
        this.router.navigateByUrl("/epagal/list-business");
    }

    createBusiness() {
        if (this.businessForm.valid) {

            let puntoGeografico = new PuntoGeograficoModel();

            puntoGeografico.nombre = this.businessForm.value.nombre;
            puntoGeografico.latitud = this.latitudMapa;
            puntoGeografico.longitud = this.longitudMapa;

            //Primero guardar puntos geograficos
            //TODO SE PUESDE OPTIMIZARR................... CON PROMESAS EN CADENA otra version ????
            this.puntoGeograficoService.savePuntoGeografico(puntoGeografico).subscribe(
                (resp: any) => {
                    this.businessForm.value.id_punto_geografico = resp.puntoGeografico.id_punto_geografico;
                    this.businessService.saveEmpresaRecicladora(this.businessForm.value).subscribe(
                        (resp: any) => {
                            this.guardarTipoDesperdicioRecilar(resp.empresaRecicladora.id_empresa_recicladora);
                            this.router.navigateByUrl("/epagal/list-business");
                        }, (e) => console.log(e)
                    );
                },
                (e) => console.error(e)
            );

        }
    }

    guardarTipoDesperdicioRecilar(idEmpresa){
        this.businessService.saveTiposDesperdicios(idEmpresa,this.listaTiposDesperdicios).subscribe(
            resp => {
                this.businessForm.reset();
                this.router.navigateByUrl("/epagal/list-business");
            },
            (e) => console.error(e)
        );
    }

    editBusiness() {
        if (this.businessForm.valid) {
            this.businessService.updateEmpresaRecicaldora(this.businessForm.value,
                this.business.id_empresa_recicladora.toString()
            ).subscribe(
                resp => {
                    this.editarPuntoGeografico();
                    this.router.navigateByUrl("/epagal/list-business");
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
                this.guardarTipoDesperdicioRecilar(this.business.id_empresa_recicladora);
            },
            (e) => console.log(e)
        );
    }

    cargarInfo(id: string) {
        this.businessService.getEmpresaRecicaldora(id).subscribe(
            resp => {
                this.business = resp;
                let { id_empresa_recicladora, id_punto_geografico, imagen, ...dataForm } = resp;
                this.businessForm.setValue(
                    dataForm
                );
                this.cargarTiposDesperdicios(this.business.id_empresa_recicladora);
                this.cargarInfoPuntosGeograficos(this.business.id_punto_geografico);
            },
            e => {
                console.error(e);
                this.router.navigateByUrl("/epagal/list-business");
            }
        )
    }

    /**
     * CARGAR LOS TIPOS DE RECILAJE QUE HACE LA EMPRESA
     * @param id Id empresa seleccionada
     */
    cargarTiposDesperdicios(id){
        this.businessService.getTiposDesperdicios(this.business.id_empresa_recicladora).subscribe(
            (resp:any) => {
                
                this.listaTiposDesperdiciosForm =  new Array<EmpresaTiposDesperdicios>();
                this.listaTiposDesperdicios = new Array<string>();

                this.listaTiposDesperdiciosForm = resp.tiposDesperdicios;
                this.listaTiposDesperdicios = this.listaTiposDesperdiciosForm.map(
                    dt => dt.id_tipo_desperdicio.toString()
                );
            },
            (e) => console.error(e)
        );
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


    selectOpcion( e: Event ){
        let selectValue = e.target['options'][e.target['options'].selectedIndex].value;
        let selectText = e.target['options'][e.target['options'].selectedIndex].text;
        
        if( !this.listaTiposDesperdicios.includes(selectValue) ){
            //Usar para guardar
            this.listaTiposDesperdicios.push(selectValue);
            //Usar para mostrar
            let dato: EmpresaTiposDesperdicios = {
                id_empresa_tipo_desperdicio: null,
                nombre: selectText,
                id_tipo_desperdicio: selectValue
            }
            this.listaTiposDesperdiciosForm.push(dato);
        }
    }

    borrarTipoDesperdicio( idEmpresaTipoDesperdicio, id_tipo_dato ){
        
        if(idEmpresaTipoDesperdicio !== null){
            this.businessService.deleteTiposDesperdicios(idEmpresaTipoDesperdicio).subscribe(
                resp => {
                    //Validar resp ??
                    this.snackBar.open("Tipo de Desperdicio a reciclar eliminado de empresa","",{duration: 2500});
                },
                (e) => console.log(e)
            );
        }

        this.listaTiposDesperdicios = this.listaTiposDesperdicios.filter( t => t != id_tipo_dato  );
        this.listaTiposDesperdiciosForm = this.listaTiposDesperdiciosForm.filter( t => t.id_tipo_desperdicio != id_tipo_dato  );
    }
}
