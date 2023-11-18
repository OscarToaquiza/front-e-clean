import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public verMsgError:string;

  public loginForm = this.fb.group({
    usuario: ["", [ Validators.required, Validators.maxLength(20) ] ],
    contrasenia: ["", Validators.required ],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    document.body.style.background = '#F7F7F7';
  }

  login(){
    if (this.loginForm.valid){
      this.usuarioService.login(this.loginForm.value).subscribe(
        resp => {
          this.router.navigateByUrl('/');
          this.snackBar.open("Usuario logueado correctamente", null, { duration: 2000});
          localStorage.setItem("opcMenu","homeli");
        }, (e) =>{
          console.log(e);
          this.verMsgError = e.error.msg;
          console.log(this.verMsgError);
          this.loginForm.reset();        
        }
        );

    }
  }

}
