import { PuntoGeograficoModel } from "../BD/puntoGeografico.model";

export interface SeeNotificacion{
    apellido: string,
    descripcion: string,
    fecha: Date,
    id_notificacion_problema: number,
    id_usuario: number,
    imagen: string,
    latitud: string,
    longitud: string,
    nombre: string,
    nombre_tipo: string,
    sector: string
}