import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TramiteModel } from 'src/app/models/BD/tramite.model';
import { TramiteService } from 'src/app/services/tramite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mant-paperwork',
  templateUrl: './mant-paperwork.component.html'
})
export class MantPaperworkComponent implements OnInit {

  public paperworkForm = this.fb.group({
    nombre: ["", Validators.required ],
    detalles: ["", Validators.required ]
  });

  public parametroMostrar = false;
  public paperwork: TramiteModel;

  public tinymceKey = environment.tinymceApiKey;

  constructor(
    private fb: FormBuilder,
    private paperworkService: TramiteService,
    private activateRoute: ActivatedRoute,
    private router: Router
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
    this.router.navigateByUrl("/epagal/list-paperworks");
  }

  crearPaperwork(){
    if( this.paperworkForm.valid ){
      this.paperworkService.saveTramite(this.paperworkForm.value).subscribe(
        (resp:any) =>{
            this.paperworkForm.reset();
            this.router.navigateByUrl("/epagal/list-paperworks");
        },(e)=>console.log(e)
      );
    }
  }

  editarPaperwork(){
    if( this.paperworkForm.valid ){
      this.paperworkService.updateTramite(this.paperworkForm.value, 
        this.paperwork.id_tramite.toString()
        ).subscribe(
        resp =>{
            this.paperworkForm.reset();         
            this.router.navigateByUrl("/epagal/list-paperworks");
        },(e)=>console.log(e)
      );
    }
  }

  cargarInfo(id:string){
    this.paperworkService.getTramite(id).subscribe(
      resp => {
        this.paperwork = resp;
        let {id_tramite, id_usuario, ...dataForm} = resp; 
        this.paperworkForm.setValue(
            dataForm
        );
      },
      e => {
        console.error(e);
        this.router.navigateByUrl("/epagal/list-paperworks");
      }
    )
  }
}
