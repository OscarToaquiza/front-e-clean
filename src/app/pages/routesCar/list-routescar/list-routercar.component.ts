import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { CabeceraRutaService } from 'src/app/services/cabeceraRuta.service';

@Component({
    selector: 'app-list-routercar',
    templateUrl: './list-routercar.component.html'
})
export class ListRoutercarComponent implements OnInit {

    public totalRutas: number;
    public desde: number = 0;

    displayedColumns: string[] = ['id', 'nombre', 'dias-ruta','acciones'];
    dataSource = new MatTableDataSource();

    public mapa: Mapboxgl.Map;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private router: Router,
        private cabeceraRutaService: CabeceraRutaService,
        private snakBar: MatSnackBar,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.listar();
    }


      async listar() {
        await this.cabeceraRutaService.getRutasCreadas(this.desde).subscribe(
          resp => {
            this.totalRutas = resp.count;
            this.dataSource = new MatTableDataSource(resp.rows);
          },
          (e) => console.error(e)
        );
      }

      dataPagination(event: PageEvent) {
        this.desde = event.pageIndex * 10;
        this.listar();
      }

      goCreateRoutercar() {
        this.router.navigateByUrl("/epagal/list-router-car/mant/0");
      }

}
