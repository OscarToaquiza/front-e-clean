import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as $ from "jquery";
import { UsuarioModel } from "src/app/models/BD/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "topnav-bar",
  providers: [],
  templateUrl: "./top-nav-bar.component.html"
})
export class TopNavBarComponent {

  @Input() 
  estado: number = 0;
  @Output() ocultarNav: EventEmitter<number> = new EventEmitter<number>();

  public verDataUser = false;
  public usuario: UsuarioModel;
  constructor(
    private usuarioService: UsuarioService
  ) {}

  toggleClicked(event: MouseEvent) {
    
    if(this.estado === 0){
      this.estado = 1;
      this.ocultarNav.emit(this.estado);
    }else{
      this.estado = 0;
      this.ocultarNav.emit(this.estado);
    }

    var body = $("body");
    var menu = $("#sidebar-menu");

    // toggle small or large menu
    if (body.hasClass("nav-md")) {
      menu.find("li.active ul").hide();
      menu
        .find("li.active")
        .addClass("active-sm")
        .removeClass("active");
    } else {
      menu.find("li.active-sm ul").show();
      menu
        .find("li.active-sm")
        .addClass("active")
        .removeClass("active-sm");
    }
    //body.toggleClass("nav-md nav-sm");
  }

  ngOnInit() {
    this.getUser();
  }

  verDataUserButton(){
    if(this.verDataUser){
      this.verDataUser = false
    }else{
      this.verDataUser = true;
    }
  }

  salir(){
    this.usuarioService.logout();
  }

  getUser(){
    this.usuarioService.getUserData().subscribe(
      (resp:any) => {
        this.usuario = resp.usuario;
      },
      (e) => console.log(e)
    )
  }

}
