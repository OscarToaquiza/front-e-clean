import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MsgConfirmComponent } from 'src/app/angular-material/msg-confirm/msg-confirm.component';
import { TipoDataService } from 'src/app/services/tipodato.service';

@Component({
  selector: 'app-list-type-data',
  templateUrl: './list-type.data.component.html'
})
export class ListTypeDataComponent implements OnInit {

  public totalTypesData: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  public tipoSelected = "0";
  public estadoSelected = "1";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private tipoDataService: TipoDataService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  async listarTipoDatos() {
    await this.tipoDataService.getTiposDatosActivos(this.desde).subscribe(
      resp => {
        this.totalTypesData = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.buscar();
  }

  irCrearTypeData() {
    this.router.navigateByUrl("/epagal/list-types-data/mant/0");
  }

  darBajaTypeData( idTypeData, estado ) {
    let dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '350px',
      data: { mensaje: "Esta seguro que desea realizar esta operaciòn" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {

        this.tipoDataService.changeEstadoTipoDato(idTypeData, estado).subscribe(
          resp => {
            this.snakBar.open("Operacion ejecutada con éxito!", '', {
              duration: 3000
            });
            this.buscar();
          },
          (e) => console.log(e)
        )
      }
    });
  }

  listarTipoDatosDesactivados() {
    this.tipoDataService.getTiposDatosDesactivados().subscribe(
      resp => {
        this.totalTypesData = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  buscar() {
    if (this.tipoSelected === "0") {
      if (this.estadoSelected == "1") {
        this.listarTipoDatos();
      } else { 
        this.listarTipoDatosDesactivados();
      }
    } else {
      this.tipoDataService.getTiposDatosByTipo(0, this.tipoSelected, this.estadoSelected).subscribe(
        resp => {
          this.totalTypesData = resp.count;
          this.dataSource = new MatTableDataSource(resp.rows);
        },
        (e) => console.error(e)
      );
    }
  }

}
