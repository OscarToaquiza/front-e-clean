import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpresaRecicladoraService } from 'src/app/services/empresaRecicladora.service';

@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html'
})
export class ListBusinessComponent implements OnInit {

  public totalEmpresas: number;
  public desde: number = 0;

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'sector','acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private businessService: EmpresaRecicladoraService,
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  async listar() {
    await this.businessService.getEmpresaRecicaldoras(this.desde).subscribe(
      resp => {
        this.totalEmpresas = resp.count;
        this.dataSource = new MatTableDataSource(resp.rows);
      },
      (e) => console.error(e)
    );
  }

  dataPagination(event: PageEvent) {
    this.desde = event.pageIndex * 10;
    this.listar();
  }

  irCreateBusiness() {
    this.router.navigateByUrl("/epagal/list-business/mant/0");
  }

}
