import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlmacenajeResiduoService } from 'src/app/services/alamcenajeResiduos.service';

@Component({
  selector: 'app-list-containers',
  templateUrl: './list-containers.component.html'
})
export class ListContainersComponent implements OnInit {

  public totalContainers: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'nombre','tipo', 'capacidad', 'estado', 'sector', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private containersService: AlmacenajeResiduoService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  async listar() {
    await this.containersService.getAlamcenajesResiduos(this.desde).subscribe(
      resp => {
        console.log(resp);
        this.totalContainers = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listar();
  }

  irCreatContainer() {
    this.router.navigateByUrl("/epagal/list-containers/mant/0");
  }

}
