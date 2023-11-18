import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public claseNav: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  changeNav(e){
    this.claseNav = e;
  }


}
