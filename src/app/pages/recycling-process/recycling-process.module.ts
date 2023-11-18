import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { PipesModule } from '../../pipes/pipes.module';
import { ListRecyclingProcessComponent } from './list-recycling-process/list-recycling-process.component';
import { MantRecyclingProcessComponent } from './mant-recycling-process/mant-recycling-process.component';


@NgModule({
  declarations: [
    ListRecyclingProcessComponent,
    MantRecyclingProcessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    EditorModule,
    PipesModule
  ]
})
export class RecyclingProcessModule { }
