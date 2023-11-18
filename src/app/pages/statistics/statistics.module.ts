import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MainSatatisticsComponent } from './main-statistics/main-statistics.component';
import { ReportNotificationComponent } from './report-notification/report-notification.component';


@NgModule({
  declarations: [
    MainSatatisticsComponent,
    ReportNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class StatisticsModulerModule { }
