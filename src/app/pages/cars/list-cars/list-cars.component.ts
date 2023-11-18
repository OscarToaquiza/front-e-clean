import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MsgConfirmComponent } from 'src/app/angular-material/msg-confirm/msg-confirm.component';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './list-cars.component.html'
})
export class ListCarsComponent implements OnInit {

  public totalCars: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'placa', 'modelo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private carService: CarService ,
    private snakBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarCars();
  }

  async listarCars() {
    await this.carService.getCars(this.desde).subscribe(
      resp => {
        this.totalCars = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listarCars();
  }

  irCrearCar() {
    this.router.navigateByUrl("/epagal/list-cars/mant/0");
  }

  borrarCar(idCar) {
    let dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '350px',
      data: { mensaje: "Esta seguro que desea dar de baja el vehiculo" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {

        this.carService.deleteCar(idCar).subscribe(
          resp => {
            this.snakBar.open("Vehiculo dado de baja con éxito!", '', {
              duration: 3000
            });
            this.listarCars()
          },
          (e) => console.log(e)
        )
      }
    });
  }

}
