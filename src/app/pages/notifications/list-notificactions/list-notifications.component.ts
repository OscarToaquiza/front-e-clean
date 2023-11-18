import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html'
})
export class ListNotificationsComponent implements OnInit {

  public totalNotificaciones: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'sector', 'fecha', 'tipo','estado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private notificacionService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  async listar() {
    await this.notificacionService.getNotificaciones(this.desde).subscribe(
      resp => {
        console.log(resp);
        this.totalNotificaciones = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listar();
  }

}
