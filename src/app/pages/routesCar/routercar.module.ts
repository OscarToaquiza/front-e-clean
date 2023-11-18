import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ListRoutercarComponent } from './list-routescar/list-routercar.component';
import { MantRoutercarComponent } from './mant-routercar/mant-routercar.component';

@NgModule({
  declarations: [
    ListRoutercarComponent,
    MantRoutercarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class RoutercarModule { }
