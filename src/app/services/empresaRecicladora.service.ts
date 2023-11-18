import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { EmpresaRecicladoraModel } from '../models/BD/empresaRecicladora.model';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class EmpresaRecicladoraService{

    constructor( private http: HttpClient){
    }


    saveEmpresaRecicladora( empresa: EmpresaRecicladoraModel ){
        return this.http.post( `${base_url}/empresa-recicladora/crear`, empresa  );
    }

    updateEmpresaRecicaldora( empresa: EmpresaRecicladoraModel, id: string ){
      return this.http.put( `${base_url}/empresa-recicladora/${id}`, empresa );
    }

    getEmpresaRecicaldoras(desde: number = 0) {
      return this.http.get( `${base_url}/empresa-recicladora?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.empresasRecicladoras
        )
      );
    }

    getEmpresaRecicaldora( id: string){
      return this.http.get( `${base_url}/empresa-recicladora/${id}` ).pipe(
        map(
          (resp:any) => resp.empresaRecicladora
        )
      );
    }

    //Datos del tipos de desperdicios asociasdos a la empresa.

    saveTiposDesperdicios( id_empresa, listaTipoDatos ){
      let dataBody = {
        id_empresa,
        listaTipoDatos
      };
      return this.http.post(`${base_url}/empresa-recicladora/tipo-desperdicio/agregar`, dataBody);
    }

    getTiposDesperdicios( id_empresa ){
      return this.http.get(`${base_url}/empresa-recicladora/tipo-desperdicio/${id_empresa}`);
    }
    
    deleteTiposDesperdicios( id: string){
      return this.http.delete( `${base_url}/empresa-recicladora/tipo-desperdicio/${id}`);
    }

    // Mapa principal
    getEmpresaRecicaldorasBySector( id ){
      return this.http.get( `${base_url}/empresa-recicladora/sector/${id}` ).pipe(
        map(
          (resp:any) => resp.listaEmpresas
        )
      );
    }

}