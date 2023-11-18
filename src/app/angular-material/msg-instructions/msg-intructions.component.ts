import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-intructions',
  templateUrl: './msg-intructions.component.html'
})
export class MsgIntructionsComponent implements OnInit {

  mensaje : string;
  btn = "aceptar";

  constructor( 
    public dialogRef: MatDialogRef<MsgIntructionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.mensaje = data.mensaje;
     }


  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
