import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-confirm',
  templateUrl: './msg-confirm.component.html'
})
export class MsgConfirmComponent implements OnInit {

  mensaje : string;
  btn = "aceptar";

  constructor( 
    public dialogRef: MatDialogRef<MsgConfirmComponent>,
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
