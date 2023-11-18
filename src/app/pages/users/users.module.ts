import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { MantUsersComponent } from './mant-users/mant-users.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ListUsersComponent,
    MantUsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    PipesModule
  ]
})
export class UserModule { }
