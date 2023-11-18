import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lugares;

  constructor(
    private lugarService: LugarService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.cargarInfo();
  }

  cargarInfo(){
    this.lugarService.getLugares().subscribe(
      resp => {
        this.lugares = resp;
      },
      (e) => console.error(e)
    );
  }

  verMapa( id, nombre ){
    this.router.navigate(["epagal/home/view-mapa",id,nombre]);
  }

}
