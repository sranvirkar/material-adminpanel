import { DialogBoxForMessageComponent } from './../dialog-box-for-message/dialog-box-for-message.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface MessageItems {
  id: number;
  name: string;
  body: string;
  campaignName: string;
}

const ELEMENT_DATA: MessageItems[] = [
  {id: 1, name: 'Message1', body: 'Example1', campaignName: ''},
  {id: 2, name: 'Message2', body: 'Example2', campaignName: ''},
  {id: 3, name: 'Message3', body: 'Example3', campaignName: ''},
  {id: 4, name: 'Message4', body: 'Example4', campaignName: ''},
  {id: 5, name: 'Message5', body: 'Example5', campaignName: ''}
];


@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'body', 'campaignName', 'delete'];
  dataSource = ELEMENT_DATA;
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


