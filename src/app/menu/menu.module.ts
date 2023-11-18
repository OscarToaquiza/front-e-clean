import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { Footer } from './footer/footer.component';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  declarations: [
    SidebarComponent,
    TopNavBarComponent,
    Footer
  ],
  exports:[
    SidebarComponent,
    TopNavBarComponent,
    Footer
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class MenuModule { }
