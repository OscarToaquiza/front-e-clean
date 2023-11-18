import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ListBusinessComponent } from './list-business/list-business.component';
import { MantBusinessComponent } from './mant-business/mant-business.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    ListBusinessComponent,
    MantBusinessComponent
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

export class BusinessModule { }
