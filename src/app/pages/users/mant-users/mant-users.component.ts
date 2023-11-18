import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/BD/usuario.model';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mant-news',
  templateUrl: './mant-users.component.html'
})
export class MantUsersComponent implements OnInit {

    public usuarioEdit: UsuarioModel;
    public userProfileForm = this.fb.group({
        nombre: ["", Validators.required ],
        apellido: ["", Validators.required ],
        cedula: ["", Validators.required ],
        puestotrabajo: "",
        telefono: "",
        observacion: "",
        rol: ["", Validators.required],
        usuario: "",
        contrasenia: "12345"
    });

  public imagenSubir: File;

  public parametroMostrar = false;
  public imgTemp: any = null;

  public valorCedula: string;

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private activateRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getParametro();
  }

  getParametro(){

    let id = this.activateRoute.snapshot.params.id;
    
    if( id !== '0' ){
        this.parametroMostrar = true;
        return this.cargarInfoUsuario(id);
    }
  }

  irAtras(){
    this.router.navigateByUrl("/epagal/list-users");
  }

  crearUsuario(){
    this.userProfileForm.value.usuario = this.valorCedula;
    console.log(this.userProfileForm.value);
    if( this.userProfileForm.valid ){
      this.userService.register(this.userProfileForm.value).subscribe(
        (resp:any) =>{
          this.snackBar.open(resp.msg,null,{duration: 2500});
          this.userProfileForm.reset();
          this.router.navigateByUrl("/epagal/list-users");
        },(e)=>console.log(e)
      );
    }
  }

  editarUsuario(){
    console.log(this.userProfileForm.value);
    if( this.userProfileForm.valid ){
      this.userService.updateUserInfo(this.userProfileForm.value, 
        this.usuarioEdit.id_usuario.toString()
        ).subscribe(
        resp =>{
          this.userProfileForm.reset();
          if(this.imagenSubir != null){
            this.subirImagen(this.usuarioEdit.id_usuario);
          }else{
            this.router.navigateByUrl("/epagal/list-users");
            this.snackBar.open("Usuario editado de forma correcta!",null,{duration: 2500});
          }
        },(e)=>console.log(e)
      );
    }
  }

  cargarInfoUsuario(id:string){
    this.userService.getUser(id).subscribe(
      resp => {
        this.usuarioEdit = resp;
        let {id_usuario, id_favorito, imagen_perfil, ...dataForm} = resp; 
        this.userProfileForm.setValue(
            dataForm
        );
      },
      e => {
        console.error(e);
        this.router.navigateByUrl("/epagal/list-users");
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
    this.fileUploadService.actualizarImagen(this.imagenSubir, "usuarios", idNoticia)
      .then(
        resp => {
          if(resp.ok){
            this.router.navigateByUrl("/epagal/list-users");
            this.snackBar.open("Usuario e imagen editado de forma correcta!",null,{duration: 2500});
          }else{
            console.log(resp);
          }
        }
      )
  }
}
