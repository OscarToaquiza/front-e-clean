import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ListContainersComponent } from './list-containers/list-containers.component';
import { MantContainersComponent } from './mant-containers/mant-containers.component';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    ListContainersComponent,
    MantContainersComponent
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
export class ContainersModule { }
