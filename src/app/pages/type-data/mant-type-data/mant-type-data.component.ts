import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDataModel } from 'src/app/models/BD/tipoData.model';
import { TipoDataService } from 'src/app/services/tipodato.service';

@Component({
  selector: 'app-mant-cars',
  templateUrl: './mant-type-data.component.html'
})
export class MantTypeDataComponent implements OnInit {

  public typeDatForm = this.fb.group({
    tipo: ["",Validators.required],
    nombre: ["",Validators.required],
    estado: true,
    observacion: ""
  });

  public parametroMostrar = false;
  public tipoDatoEdit: TipoDataModel;

  constructor(
    private fb: FormBuilder,
    private tipoDatoService: TipoDataService,
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
        return this.cargarInfo(id);
    }
  }

  irAtras(){
    this.router.navigateByUrl("/epagal/list-types-data");
  }

  crearTypeData(){
    console.log(this.typeDatForm.valid);
    if( this.typeDatForm.valid ){
      this.tipoDatoService.saveTipoDato(this.typeDatForm.value).subscribe(
        (resp:any) =>{
          this.snackBar.open("Tipo de dato agregado de forma correcta!","",{duration: 2500});
          this.typeDatForm.reset();
          this.router.navigateByUrl("/epagal/list-types-data");
        },(e)=>console.log(e)
      );
    }
  }

  editarTypeData(){
    console.log(this.typeDatForm.value);
    if( this.typeDatForm.valid ){
      this.tipoDatoService.updateTipoDato(this.typeDatForm.value, 
        this.tipoDatoEdit.id_tipo_dato.toString()
        ).subscribe(
        resp =>{
          this.snackBar.open("Tipo de dato editado de forma correcta!","",{duration: 2500});
          this.typeDatForm.reset();
          this.router.navigateByUrl("/epagal/list-types-data");
        },(e)=>console.log(e)
      );
    }
  }

  cargarInfo(id:string){
    this.tipoDatoService.getTipoDato(id).subscribe(
      resp => {
        this.tipoDatoEdit = resp;
        console.log(resp);
        console.log(this.tipoDatoEdit);
        let {id_tipo_dato, ...dataForm} = resp; 
        this.typeDatForm.setValue(
            dataForm
        );
      },
      e => {
        console.error(e);
        this.snackBar.open("ERROR AL CARGAR TIPO DATO","",{duration: 2500});
        this.router.navigateByUrl("/epagal/list-types-data");
      }
    )
  }
}
