import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {

  restablecerOpcMenu(){
    localStorage.setItem("opcMenu","homeli");
  }

}
