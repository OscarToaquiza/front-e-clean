import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ListTypeDataComponent } from './list-type-data/list-type.data.component';
import { MantTypeDataComponent } from './mant-type-data/mant-type-data.component';

@NgModule({
  declarations: [
    ListTypeDataComponent,
    MantTypeDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class TypesDataModule { }
