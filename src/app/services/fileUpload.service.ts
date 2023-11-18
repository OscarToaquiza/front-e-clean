import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {

    constructor(){

    }

    async actualizarImagen(
        archivo: File,
        tipo: "noticias"|"notificaciones"|"usuarios"|"reciclaje"|"empresa",
        id: string
    ){   
        try {
            const url = `${base_url}/uploads/${tipo}/${id}`;
            const formDate = new FormData();
            formDate.append("imagen", archivo);

            const resp = await fetch( url, {
                method: "POST",
                headers: {},
                body: formDate
            });

            const data = await resp.json();
            
            if(data.ok){
                return data;
            }else{
                console.log(data.msg);
                return false;
            }
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}