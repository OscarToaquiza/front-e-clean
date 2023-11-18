import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'app-grafica-mapa',
    templateUrl: './grafica-mapa.component.html'
})
export class GraficaMapaComponent implements OnInit {

    public barChartOptions: ChartOptions = {
        title: {
            text: "Notificaciones por día",
            display: true
        },
        responsive: true
    };

    public legendFalse = false;
    public barChartLabels: Label[];
    public barChartData: ChartDataSets[];

    @Input() listaPuntosEjeX: [];
    @Input() listaPuntosEjeY: [];
    @Input() listaPuntosEjeYResuelto: [];
    @Input() listaColoresBarra: [];
    @Input() listaColoresBarraHover: [];


    constructor(
    ) {}

    ngOnInit(): void {
    }
    
    ngOnChanges( chamges: SimpleChanges ){
        // console.log(this.listaPuntosEjeX);
        // console.log(this.listaPuntosEjeY);
        // console.log(this.listaColoresBarra);
        // console.log(this.listaColoresBarraHover);
        this.getGraficaSemana();       
    }

    getGraficaSemana() {

        this.barChartData = [
            {
                data: this.listaPuntosEjeY,
                label: "Notificaciones",
                backgroundColor: this.listaColoresBarra,
                borderColor: this.listaColoresBarra,
                hoverBorderColor: this.listaColoresBarraHover,
                hoverBackgroundColor: this.listaColoresBarraHover,
                borderWidth: 2
            },
            {
                data: this.listaPuntosEjeYResuelto,
                label: "Resueltas"
            }
        ];

        this.barChartLabels = this.listaPuntosEjeX;
    }


 
}
