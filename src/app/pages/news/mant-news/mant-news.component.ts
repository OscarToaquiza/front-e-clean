import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaModel } from 'src/app/models/BD/notica.model';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mant-news',
  templateUrl: './mant-news.component.html'
})
export class MantNewsComponent implements OnInit {

  public noticiaForm = this.fb.group({
    titulo: ["", Validators.required ],
    detalle: ["", Validators.required ],
    estado: false
  });

  public imagenSubir: File;

  public parametroMostrar = false;
  public noticia: NoticiaModel;
  public imgTemp: any = null;

  public tinymceKey = environment.tinymceApiKey;

  constructor(
    private fb: FormBuilder,
    private noticiaService: NoticiaService,
    private activateRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getParametro();
  }

  getParametro(){

    let id = this.activateRoute.snapshot.params.id;
    
    if( id !== '0' ){
        this.parametroMostrar = true;
        return this.cargarInfoNoticia(id);
    }
  }

  irAtras(){
    this.router.navigateByUrl("/epagal/list-news");
  }

  crearNoticia(){
    if( this.noticiaForm.valid ){
      this.noticiaService.saveNoticia(this.noticiaForm.value).subscribe(
        (resp:any) =>{
          console.log(resp);
          this.noticiaForm.reset();
          if(this.imagenSubir != null){
            this.subirImagen(resp.noticia.id_noticia);
          }else{
            this.router.navigateByUrl("/epagal/list-news");
          }
        },(e)=>console.log(e)
      );
    }
  }

  editarNoticia(){
    if( this.noticiaForm.valid ){
      this.noticiaService.updateNoticia(this.noticiaForm.value, 
        this.noticia.id_noticia.toString()
        ).subscribe(
        resp =>{
          //Swal.fire("Jugador guardado","de forma correcta","success");
          this.noticiaForm.reset();
          if(this.imagenSubir != null){
            this.subirImagen(this.noticia.id_noticia);
          }else{
            this.router.navigateByUrl("/epagal/list-news");
          }
        },(e)=>console.log(e)
      );
    }
  }

  cargarInfoNoticia(id:string){
    this.noticiaService.getNoticia(id).subscribe(
      resp => {
        this.noticia = resp;
        let {id_noticia,imagen,fecha_creacion, ...dataForm} = resp; 
        this.noticiaForm.setValue(
            dataForm
        );
      },
      e => {
        console.error(e);
        this.router.navigateByUrl("/epagal/list-news");
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

  subirImagen( idNoticia ){
    this.fileUploadService.actualizarImagen(this.imagenSubir, "noticias", idNoticia)
      .then(
        resp => {
          if(resp.ok){
            this.router.navigateByUrl("/epagal/list-news");
          }else{
            console.log(resp);
          }
        }
      )
  }
}
