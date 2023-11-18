import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { MenuUsers } from "src/app/models/interfaces/menu.users.intreface";
import { UsuarioService } from "src/app/services/usuario.service";


@Component({
  selector: "side-bar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {

  public nombreUsuario;
  public rutaImg;
  public opcMenuSelect;
  public rolUser;

  constructor(
    private usuarioService: UsuarioService,
  ) {
    this.getUser();
  }

  ngOnInit(){
    this.opcMenuSelect = localStorage.getItem("opcMenu");
    this.anchorClicked(null);
  }


  anchorClicked(event: MouseEvent) {

    if( event !== null ){
      let target = event.target as Element;
      let targetData = target.id;
      
      localStorage.setItem("opcMenu",targetData);

      let $li = $("#" + targetData.replace("chevron", "li")).parent();
  
      if ($li.is(".active")) {
        $li.removeClass("active active-sm");
        $("ul:first", $li).slideUp(function () { });
      } else {
        // prevent closing menu if we are on child menu
        if (!$li.parent().is(".child_menu")) {          
          $("#sidebar-menu")
            .find("li")
            .removeClass("active active-sm");
          $("#sidebar-menu")
            .find("li ul")
            .slideUp();
        }
        $li.addClass("active");
        $("ul:first", $li).slideDown(function () { });
      }
    } else{
      let $li = $("#" + this.opcMenuSelect.replace("chevron", "li")).parent();
        if (!$li.parent().is(".child_menu")) {
          $("#sidebar-menu")
            .find("li")
            .removeClass("active active-sm");
          $("#sidebar-menu")
            .find("li ul")
            .slideUp();
        }
        $li.addClass("active");
        $("ul:first", $li).slideDown(function () { });
    }
  }

  getUser() {
    this.usuarioService.getUserData().subscribe(
      (resp: any) => {
        this.nombreUsuario = resp.usuario.usuario;
        this.rutaImg = resp.usuario.imagen_perfil;
        this.rolUser = resp.usuario.rol;
      },
      (e) => console.log(e)
    )
  }

  salir(){
    this.usuarioService.logout();
  }

}
