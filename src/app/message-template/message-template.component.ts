import { DialogBoxForMessageComponent } from './../dialog-box-for-message/dialog-box-for-message.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    this.dialog.open(DialogBoxForMessageComponent, {
      width: '400px',
    });
  }
  AddMessage() {
    console.log('Add logic');
  }
}


