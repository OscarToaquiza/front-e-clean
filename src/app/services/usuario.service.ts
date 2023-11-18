import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/BD/usuario.model';
import { LoginInterface } from '../models/interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModule } from '../pages/users/users.module';
import { RegisterInterface } from '../models/interfaces/register.interface';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    /**
     * Obtener token general
     */
    get token(): string{
        return sessionStorage.getItem('epagalToken') || '';
      }
    
    get tokenUser(): string{
        return sessionStorage.getItem('userLogin') || '';
      }

    register(usuario: RegisterInterface) {
        return this.http.post(`${base_url}/usuarios/register`, usuario);
    }

    login(formData: LoginInterface) {
        return this.http.post(`${base_url}/auth/login`, formData).pipe(
            tap((resp: any) => {
                sessionStorage.setItem("epagalToken", resp.token);
            })
        );
    }

    validarToken(): boolean {
        if (sessionStorage.getItem("epagalToken")) {
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem("epagalToken");
        sessionStorage.removeItem("userLogin");
        localStorage.removeItem("opcMenu");
        this.router.navigateByUrl("/epagal/login");
    }

    getUserData(){
        return this.http.get(`${base_url}/usuarios/data/user/by/token`, {
            headers: {
              'x-token-epagal': this.token
            }
          }).pipe(
              //TODO: Se puede optimizar todo en el login.
            tap((resp: any) => {
                //console.log( JSON.stringify(resp.usuario));
                sessionStorage.setItem("userLogin", JSON.stringify(resp.usuario));
            })
          )
    }

    getUser(id_user){
        return this.http.get(`${base_url}/usuarios/get/${id_user}`).pipe(
            map(
              (resp:any) => resp.usuario
            )
          );
    }

    updateUserInfo( userForm: UserModule, id_user ){
        return this.http.put(`${base_url}/usuarios/${id_user}`, userForm);
    }

    getListUsers(desde: number = 0) {
        return this.http.get( `${base_url}/usuarios/lista?desde=${desde}` ).pipe(
          map(
            (resp:any) => resp.usuarios
          )
        );
      }

    darBajaUsuario(id){
        return this.http.delete(`${base_url}/usuarios/${id}` );
    }

    contarUsuarios(){
      return this.http.get(`${base_url}/usuarios/contar` );
    }

}