import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { VehiculoModel } from '../models/BD/vehiculo.model';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class CarService{

    constructor( private http: HttpClient){
    }


    saveCar( vehiculo: VehiculoModel ){
        return this.http.post( `${base_url}/vehiculo/crear`, vehiculo );
    }

    updateCar( vehiculo: VehiculoModel, id: string ){
      return this.http.put( `${base_url}/vehiculo/${id}`, vehiculo );
    }

    getCars(desde: number = 0) {
      return this.http.get( `${base_url}/vehiculo?desde=${desde}` ).pipe(
        map(
          (resp:any) => resp.vehiculos
        )
      );
    }

    getCar( id: string){
      return this.http.get( `${base_url}/vehiculo/${id}` ).pipe(
        map(
          (resp:any) => resp.vehiculo
        )
      );
    }

    
    deleteCar( id: string){
      return this.http.patch( `${base_url}/vehiculo/${id}`,null);
    }

}