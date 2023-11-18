import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

const api_url = environment.base_url;

@Pipe({
    name: 'imagen'
})

export class ImagenPipe implements PipeTransform{

    transform( img: string,  tipo: "noticias"|"notificaciones"|"usuarios"|"reciclaje"|"empresa", ...args: any[]) {
        if(img){
            return `${api_url}/uploads/${tipo}/${img}`;
        }else{
            return `${api_url}/uploads/${tipo}/no-image.png`;
        }

        
    }

}