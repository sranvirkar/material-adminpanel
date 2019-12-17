import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  localdata: any;

  constructor( public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.localdata = data;
      console.log( this.localdata);
    }

  ngOnInit() {
  }

  doAction() {
    switch(this.localdata.action) {
      case 'close':
        this.dialogRef.close({event: this.localdata.action, data: {}});
        break;
    }
  }

}
