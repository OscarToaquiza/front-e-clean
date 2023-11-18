import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MsgConfirmComponent } from 'src/app/angular-material/msg-confirm/msg-confirm.component';
import { ProcesoReciclajeService } from 'src/app/services/procesoReciclaje.service';

@Component({
  selector: 'app-recycling-process',
  templateUrl: './list-recycling-process.component.html'
})
export class ListRecyclingProcessComponent implements OnInit {

  public totalProcess: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private procesoService: ProcesoReciclajeService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  async listar() {
    await this.procesoService.getProcesosReciclaje(this.desde).subscribe(
      resp => {
        console.log(resp);
        this.totalProcess = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listar();
  }

  irCrearProcesoReciclaje() {
    this.router.navigateByUrl("/epagal/list-recycling-process/mant/0");
  }

  borrarProcess(idProcess) {
    let dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '350px',
      data: { mensaje: "Esta seguro que desea eliminar este proceso de reciclaje" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {

        this.procesoService.deleteProcesoReciclaje(idProcess).subscribe(
          resp => {
            this.snakBar.open("Proceso de reciclaje eliminado con éxito!", '', {
              duration: 3000
            });
            this.listar();
          },
          (e) => console.log(e)
        )
      }
    });
  }

}
