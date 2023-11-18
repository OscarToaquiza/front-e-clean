import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MsgConfirmComponent } from 'src/app/angular-material/msg-confirm/msg-confirm.component';
import { NoticiaModel } from 'src/app/models/BD/notica.model';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './list-news.component.html'
})
export class ListNewsComponent implements OnInit {

  public totalNoticias: number;
  public noticias: NoticiaModel[];
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'titulo', 'fecha', 'publicada', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private noticiaService: NoticiaService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarNoticias();
  }

  async listarNoticias() {
    await this.noticiaService.getNoticias(this.desde).subscribe(
      resp => {
        this.totalNoticias = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listarNoticias();
  }

  irCrearNoticia() {
    this.router.navigateByUrl("/epagal/list-news/mant/0");
  }

  borrarNoticia(idNoticia) {
    let dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '350px',
      data: { mensaje: "Esta seguro que desea eliminar la noticia" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {

        this.noticiaService.deleteNoticia(idNoticia).subscribe(
          resp => {
            this.snakBar.open("Noticia eliminada con éxito!", '', {
              duration: 3000
            });
            this.listarNoticias()
          },
          (e) => console.log(e)
        )
      }
    });
  }

}
