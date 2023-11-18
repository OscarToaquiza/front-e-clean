export interface RutaCompleta {
    diasrutas: string,
    horario: string,
    id_cabecera_ruta: number,
    nombre: string,
    detalleruta: DetalleRuta[]
}

interface DetalleRuta {
    id_detalle_ruta: number,
    punto: Punto
}

interface Punto{
    longitud: string,
    latitud: string
}