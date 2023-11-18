import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MsgConfirmComponent } from "src/app/angular-material/msg-confirm/msg-confirm.component";
import { UsuarioModel } from "src/app/models/BD/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html'
})

export class ListUsersComponent implements OnInit {

    public totalUsuarios: number;
    public usuarios: UsuarioModel[];
    public desde: number = 0;
    public idUserLogin;
  
    displayedColumns: string[] = ['id','apellido','nombre','cedula','rol','acciones'];
    dataSource = new MatTableDataSource();
    
    @ViewChild (MatPaginator) paginator: MatPaginator;

    constructor(
        private userService: UsuarioService,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {

    }

    ngOnInit(): void {
        this.listarUsuarios();
        this.idUserLogin = JSON.parse(this.userService.tokenUser).id_usuario;
        console.log(this.idUserLogin);
    }

    async listarUsuarios() {
        await this.userService.getListUsers(this.desde).subscribe(
            resp => {
                this.totalUsuarios = resp.count;
                this.dataSource = new MatTableDataSource(resp.rows);
            },
            (e) => console.error(e)
        );
    }

    dataPagination(event: PageEvent) {
        this.desde = event.pageIndex * 10;
        this.listarUsuarios();
    }

    irCrearNoticia() {
        this.router.navigateByUrl("/epagal/list-users/mant/0");
    }

    borrarUsuario(idUser){

        let dialogRef = this.dialog.open(MsgConfirmComponent,{
            width: '350px',
            data: {mensaje: "Esta seguro que desea dar de baja el usuario"}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result === 'aceptar'){
      
              this.userService.darBajaUsuario(idUser).subscribe(
                  resp =>{
                    this.listarUsuarios();
                    this.snackBar.open("Usuario eliminado con exito!",'', {
                        duration: 3000
                      });
                  },
                  (e) => console.error(e)
              );
      
              
            }
          });
    }



}