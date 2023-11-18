import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { LugarService } from 'src/app/services/lugar.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
    selector: 'app-report-notification',
    templateUrl: './report-notification.component.html'
})
export class ReportNotificationComponent implements OnInit {

    public lugares;
    public idSector = 0;
    public fechaInicio;
    public fechaFin;

    public barChartOptions: ChartOptions = {
        title: {
            text: "Notificaciones recibidas",
            display: true
        },
        responsive: true,
        scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
    };

    public legendFalse = false;
    public barChartLabels: Label[] = null;
    public barChartData: ChartDataSets[] =  null;

    public listaPuntosEjeX: [];
    public listaPuntosEjeY: [];

    public mostrarGrafica = false;

    constructor(
        private notificacionesService: NotificationsService,
        private lugarService: LugarService
    ) {}

    ngOnInit(): void {
        this.getListaugares();
        this. buscar();
    }

    getListaugares(){
        this.lugarService.getLugares().subscribe(
          resp => {
            this.lugares = resp;
          },
          (e) => console.error(e)
        );
      }
    

    selectOpcion( e ){
        this.idSector = e.target.value;
    }


    buscar(){
        // console.log(this.idSector);
        // console.log(this.fechaInicio);
        // console.log(this.fechaFin);
        this.notificacionesService.getNotificacionReporte(
            this.idSector,
            this.fechaInicio,
            this.fechaFin
        ).subscribe(    
            (resp:any) => {
                
                this.listaPuntosEjeX = resp.listaFechas;
                this.listaPuntosEjeY = resp.listaValores;
                this.getGraficaReporte();
            },
            (e) => console.log(e)
        )
    }

    getGraficaReporte() {

        this.barChartData = [
            {
                data: this.listaPuntosEjeY,
                label: "Notificaciones",
                backgroundColor: '#1abb9c',
                borderColor: '#169f85',
                hoverBorderColor: '#26b99a',
                hoverBackgroundColor: '#26b99a',
                borderWidth: 2
            }
        ];

        this.barChartLabels = this.listaPuntosEjeX;

        this.mostrarGrafica = true;
    }

 
}
