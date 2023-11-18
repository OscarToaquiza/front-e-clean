import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { ListNewsComponent } from './list-news/list-news.component';
import { MantNewsComponent } from './mant-news/mant-news.component';

import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    ListNewsComponent,
    MantNewsComponent
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
export class NewsModule { }
