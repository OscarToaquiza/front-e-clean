import { Component, OnInit } from '@angular/core';
import { AlmacenajeResiduoService } from 'src/app/services/alamcenajeResiduos.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
    selector: 'app-statistics-mapa',
    templateUrl: './main-statistics.component.html'
})
export class MainSatatisticsComponent implements OnInit {

    //Notificaciones
    public fechaHoy;
    public totalNotificacionesHoy;
    public totalUsuarios = 0;

    public totalContenedores;

    constructor(
        private notificacionesService: NotificationsService,
        private almacenajeService: AlmacenajeResiduoService,
        private usuariosService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.getNotificacionesHoy(); 
        this.getTotalContenedores();   
        this.getTotalUsuario();
    }

    getTotalUsuario(){
        this.usuariosService.contarUsuarios().subscribe(
            (resp: any) => {
                this.totalUsuarios =  resp.usuario;
            },
            (e) => console.log(e)
        );
    }

    getTotalContenedores(){
        this.almacenajeService.getTotalContenedores().subscribe(
            (resp:any )=> {
                this.totalContenedores = resp.total;
            },
            (e) => console.log(e)
        );
    }

    getNotificacionesHoy(){
        this.notificacionesService.getNotificacionesHoy().subscribe(
            (resp:any) =>  {
                this.totalNotificacionesHoy = resp.totalNotificaciones;
                this.fechaHoy = resp.fecha;
            },
            (e) => console.log(e)
        );
    }
  
}
