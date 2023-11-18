import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioModel } from "src/app/models/BD/usuario.model";
import { FileUploadService } from "src/app/services/fileUpload.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})

export class UserProfileComponent implements OnInit {

    public usuario: UsuarioModel;
    public userProfileForm = this.fb.group({
        nombre: ["", Validators.required ],
        apellido: ["", Validators.required ],
        cedula: ["", Validators.required ],
        puestotrabajo: "",
        telefono: "",
        observacion: "",
        rol: ["", Validators.required]
      });
    
    public imagenSubir: File;
    public imgTemp: any = null;

    constructor( 
        private fb: FormBuilder ,
        private userService: UsuarioService,
        private fileUploadService: FileUploadService,
        private router: Router
        ){
           
        }
    
    ngOnInit(): void {
        this.cargarInfoUserLogin();
    }

    cargarInfoUserLogin(){
        this.userService.getUserData().subscribe(
            (resp: any) => {
                this.usuario = resp.usuario;
                let { id_usuario,usuario, contrasenia, id_favorito, imagen_perfil, ...dataForm} = this.usuario; 
                this.userProfileForm.setValue(
                    dataForm
                );
            },
            (e) => console.error(e)
        );
    }


    guardarInfo(){
        if(this.userProfileForm.valid){
            this.userService.updateUserInfo(this.userProfileForm.value, this.usuario.id_usuario).subscribe(
                resp => {                    
                    if(this.imagenSubir != null){
                        this.subirImagen(this.usuario.id_usuario);
                    }else{
                        this.router.navigateByUrl("/epagal/home");
                        location.reload();
                    }
                },
                (e) => {
                    console.log(e);
                }
            );
        }
    }

    subirImagen( idUsuario ){
        this.fileUploadService.actualizarImagen(this.imagenSubir, "usuarios", idUsuario)
          .then(
            resp => {
              if(resp.ok){
                this.router.navigateByUrl("/epagal/home");
                location.reload();
              }else{
                console.log(resp);
              }
            }
          )
      }

    irInicio(){
        this.router.navigateByUrl("/epagal/home");
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

}