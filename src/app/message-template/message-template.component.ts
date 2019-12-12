import { DialogBoxForMessageComponent } from './../dialog-box-for-message/dialog-box-for-message.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
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
  resourcesLoaded = true;
  displayedColumns: string[] = ['id', 'name', 'body', 'campaignName', 'Action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxForMessageComponent, {
      width: '300px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  addRowData(rowobj) {
    let d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: rowobj.name,
      body: rowobj.body,
      campaignName: rowobj.campaignName,


    });
    this.table.renderRows();

  }

  updateRowData(rowobj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowobj.id) {
        value.name = rowobj.name;
      }
      return true;
    });
  }
  deleteRowData( rowobj ) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowobj.id;
    });
  }
 // openDialog(): void {
 //   this.dialog.open(DialogBoxForMessageComponent, {
 //     width: '400px',
 //   });

  AddMessage() {
    console.log('Add logic');
  }
  Delete() {
    console.log('Delete logic');
  }
  Edit() {
    console.log('Edit logic');
  }
}


