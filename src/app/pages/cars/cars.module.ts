import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { MantCarsComponent } from './mant-cars/mant-cars.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    ListCarsComponent,
    MantCarsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    EditorModule
  ]
})
export class CarsModule { }
