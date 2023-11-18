import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoModel } from 'src/app/models/BD/vehiculo.model';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mant-cars',
  templateUrl: './mant-cars.component.html'
})
export class MantCarsComponent implements OnInit {

  public carForm = this.fb.group({
    placa: ["",Validators.required],
    modelo:"",
    marca:"",
    estado: "",
    estado_fisico:"",
    observacion: "",
    detalle: ""
  });

  public parametroMostrar = false;
  public car: VehiculoModel;

  public tinymceKey = environment.tinymceApiKey;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getParametro();
  }

  getParametro(){

    let id = this.activateRoute.snapshot.params.id;
    
    if( id !== '0' ){
        this.parametroMostrar = true;
        return this.cargarInfoCar(id);
    }
  }

  irAtras(){
    this.router.navigateByUrl("/epagal/list-cars");
  }

  crearCar(){
    if( this.carForm.valid ){
      this.carService.saveCar(this.carForm.value).subscribe(
        (resp:any) =>{
          this.snackBar.open("Vehiculo agregado de forma correcta!","",{duration: 2500});
          this.carForm.reset();
          this.router.navigateByUrl("/epagal/list-cars");
        },(e)=>console.log(e)
      );
    }
  }

  editarCar(){
    if( this.carForm.valid ){
      this.carService.updateCar(this.carForm.value, 
        this.car.id_vehiculo.toString()
        ).subscribe(
        resp =>{
          this.snackBar.open("Vehiculo editado de forma correcta!","",{duration: 2500});
          this.carForm.reset();
          this.router.navigateByUrl("/epagal/list-cars");
        },(e)=>console.log(e)
      );
    }
  }

  cargarInfoCar(id:string){
    this.carService.getCar(id).subscribe(
      resp => {
        this.car = resp;
        let {id_vehiculo,id_punto_geografico, ...dataForm} = resp; 
        this.carForm.setValue(
            dataForm
        );
      },
      e => {
        console.error(e);
        this.snackBar.open("ERROR AL CARGAR VEHICULO","",{duration: 2500});
        this.router.navigateByUrl("/epagal/list-cars");
      }
    )
  }
}
