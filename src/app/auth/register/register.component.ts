import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public verMsgError:string;

  public registerForm = this.fb.group({
    nombre: ["", Validators.required ],
    apellido: ["", Validators.required] , 
    usuario: ["", [ Validators.required, Validators.maxLength(20) ] ],
    contrasenia: ["", Validators.required ],
    rol: 2
  });

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    if( this.registerForm.valid ){
      console.log(this.registerForm.value);
      this.userService.register(this.registerForm.value).subscribe(
        resp => {
          this.router.navigateByUrl('/');
          this.snackBar.open("Usuario creado", null, { duration: 2000});
        },(e) =>{
          console.log(e.error);
          this.verMsgError = e.error.errors[0].msg;
          console.log(this.verMsgError);
          this.registerForm.reset();
        }
      );
    }
  }

}
