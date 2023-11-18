import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MsgConfirmComponent } from 'src/app/angular-material/msg-confirm/msg-confirm.component';
import { TramiteService } from 'src/app/services/tramite.service';

@Component({
  selector: 'app-paperwork',
  templateUrl: './list-paperwork.component.html'
})
export class ListPaperworkComponent implements OnInit {

  public totalPaperwork: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'nombre','acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private paperworkService: TramiteService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  async listar() {
    await this.paperworkService.getTramites(this.desde).subscribe(
      resp => {
        this.totalPaperwork = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listar();
  }

  goCreatePaperwork() {
    this.router.navigateByUrl("/epagal/list-paperworks/mant/0");
  }

  deletePaperwork(idTramite) {
    let dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '350px',
      data: { mensaje: "Esta seguro que desea eliminar la tramite" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {

        this.paperworkService.deleteTramite(idTramite).subscribe(
          resp => {
            this.snakBar.open("Tramite eliminada con éxito!", '', {
              duration: 3000
            });
            this.listar()
          },
          (e) => console.log(e)
        )
      }
    });
  }

}
