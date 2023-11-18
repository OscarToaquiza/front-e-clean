import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { tap,map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService, private router: Router ){

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    
    let verPage = this.usuarioService.validarToken();
    if( !verPage ){
      this.router.navigateByUrl("/epagal/login");
    }
    return  verPage;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      let verPage = this.usuarioService.validarToken();
      if( !verPage ){
        this.router.navigateByUrl("/epagal/login");
      }
  
      return  verPage;

  }
  
}
