import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ListPaperworkComponent } from './list-paperworks/list-paperwork.component';
import { MantPaperworkComponent } from './mant-paperwork/mant-paperwork.component';

@NgModule({
  declarations: [
    ListPaperworkComponent,
    MantPaperworkComponent
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
export class PaperworkModule { }
