import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoReciclajeModel } from 'src/app/models/BD/procesoReciclaje.model';
import { TipoDataModel } from 'src/app/models/BD/tipoData.model';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { ProcesoReciclajeService } from 'src/app/services/procesoReciclaje.service';
import { TipoDataService } from 'src/app/services/tipodato.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mant-recycling-process',
  templateUrl: './mant-recycling-process.component.html'
})
export class MantRecyclingProcessComponent implements OnInit {

  public procesoForm = this.fb.group({
    nombre: ["", Validators.required ],
    detalle_proceso_reciclar: ["", Validators.required ],
    id_tipo_desperdicio: ["", Validators.required ]
  });

  public imagenSubir: File;

  public parametroMostrar = false;
  public proceso: ProcesoReciclajeModel;
  public imgTemp: any = null;

  public tinymceKey = environment.tinymceApiKey;

  public listaDesperdiciosSelect: TipoDataModel[];

  constructor(
    private fb: FormBuilder,
    private procesoService: ProcesoReciclajeService,
    private tipoDatoService: TipoDataService,
    private activateRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getParametro();
    this.cargarTiposDato();
  }

  getParametro(){

    let id = this.activateRoute.snapshot.params.id;
    
    if( id !== '0' ){
        this.parametroMostrar = true;
        return this.cargarInfo(id);
    }
  }

  irAtras(){
    this.router.navigateByUrl("/epagal/list-recycling-process");
  }

  crearProcesoReciclaje(){
    console.log(this.procesoForm.value);
    if( this.procesoForm.valid ){
      this.procesoService.saveProcesoReciclaje(this.procesoForm.value).subscribe(
        (resp:any) =>{
          console.log(resp);
          this.procesoForm.reset();
          if(this.imagenSubir != null){
            this.subirImagen(resp.proceso.id_proceso_reciclar);
          }else{
            this.router.navigateByUrl("/epagal/list-recycling-process");
          }
        },(e)=>console.log(e)
      );
    }
  }

  editarProcesoReciclaje(){
    console.log(this.procesoForm.value);
    if( this.procesoForm.valid ){
      this.procesoService.updateProcesoReciclaje(this.procesoForm.value, 
        this.proceso.id_proceso_reciclar.toString()
        ).subscribe(
        resp =>{
          //Swal.fire("Jugador guardado","de forma correcta","success");
          this.procesoForm.reset();
          if(this.imagenSubir != null){
            this.subirImagen(this.proceso.id_proceso_reciclar);
          }else{
            this.router.navigateByUrl("/epagal/list-recycling-process");
          }
        },(e)=>console.log(e)
      );
    }
  }

  cargarInfo(id:string){
    this.procesoService.getProcesoReciclaje(id).subscribe(
      resp => {
        this.proceso = resp;
        let {id_proceso_reciclar,imagen, ...dataForm} = resp; 
        this.procesoForm.setValue(
            dataForm
        );
      },
      e => {
        console.error(e);
        this.router.navigateByUrl("/epagal/list-recycling-process");
      }
    )
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if( !file ){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen( idProceso ){
    this.fileUploadService.actualizarImagen(this.imagenSubir, "reciclaje", idProceso)
      .then(
        resp => {
          if(resp.ok){
            this.router.navigateByUrl("/epagal/list-recycling-process");
          }else{
            console.log(resp);
          }
        }
      )
  }

    /**
     * Cargar tipos de datos activos "3" = Desperdicios
     * Sin paginación
     */
     cargarTiposDato(){
      this.tipoDatoService.getAllTiposDatosByTipo("3").subscribe(
          resp => {
              this.listaDesperdiciosSelect = resp;
          },
          (e) => console.log(e)
      );
  }

}
