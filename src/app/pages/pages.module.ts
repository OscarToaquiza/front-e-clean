import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import { MenuModule } from '../menu/menu.module';
import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { PrincipalMapComponent } from './home/principalMap/principal-map.component';
import { GraficaMapaComponent } from './home/graficaMapa/grafica-mapa.component';


import { NewsModule } from './news/news.module';
import { UserModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { TypesDataModule } from './type-data/type-data.module';
import { BusinessModule } from './business/business.module';
import { ContainersModule } from './containers/containers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaperworkModule } from './paperWorkes/paperwork.module';
import { RoutercarModule } from './routesCar/routercar.module';
import { RecyclingProcessModule } from './recycling-process/recycling-process.module';
import { StatisticsModulerModule } from './statistics/statistics.module';


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    PrincipalMapComponent,
    GraficaMapaComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    RouterModule,
    NewsModule,
    UserModule,
    CarsModule,
    TypesDataModule,
    BusinessModule,
    ContainersModule,
    NotificationsModule,
    PaperworkModule,
    RoutercarModule,
    RecyclingProcessModule,
    ChartsModule,
    StatisticsModulerModule
  ]
})
export class PagesModule { }
