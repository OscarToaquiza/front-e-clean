import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { PipesModule } from '../../pipes/pipes.module';
import { ListNotificationsComponent } from './list-notificactions/list-notifications.component';
import { SeeNotificationComponent } from './see-notification/see-notification.component';
import { EditNotificationComponent } from './edit-notifications/edit-notification.component';


@NgModule({
  declarations: [
    ListNotificationsComponent,
    SeeNotificationComponent,
    EditNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    PipesModule
  ]
})
export class NotificationsModule { }
