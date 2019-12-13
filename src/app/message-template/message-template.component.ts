import { APIService } from './../api.service';
import { DialogBoxForMessageComponent } from './../dialog-box-for-message/dialog-box-for-message.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface MessageItems {
  id: number;
  name: string;
  body: string;
  campaignId: string;
}

const ELEMENT_DATA: MessageItems[] = [
 // {id: 1, name: 'Message1', body: 'Example1', campaignId: },
 // {id: 2, name: 'Message2', body: 'Example2', campaignId: },
 // {id: 3, name: 'Message3', body: 'Example3', campaignId: },
 // {id: 4, name: 'Message4', body: 'Example4', campaignId: },
 // {id: 5, name: 'Message5', body: 'Example5', campaignId: }
];


@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
  resourcesLoaded = false;
  displayedColumns: string[] = ['id', 'name', 'body', 'campaignName', 'Action'];
  dataSource = ELEMENT_DATA;
  details: any;
  DATA = [];
  varID: any;
  ApiObj: any;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  constructor(private apiService: APIService, public dialog: MatDialog) { }

  ngOnInit() {
    this.apiService.getAllMessageTemplates().subscribe(data => {
      console.log(data);
      this.details = data;
      this.DATA = this.details;
      this.resourcesLoaded = true;

    }, err => {
      console.log(err);
    });
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
    //this.varID = 'ajinkya';
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj );
    this.apiService.saveMessageTemplate(this.ApiObj).toPromise().then(rdata => {
    console.log(rdata);
    this.resourcesLoaded = false;
    this.ngOnInit();
   });
  }

  updateRowData(rowobj) {
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj);
    this.apiService.updateMessageTemplate(this.ApiObj).toPromise().then(rdata => {
    console.log(rdata);
    this.ngOnInit();
   });
  }
  deleteRowData( rowobj ) {
    this.ApiObj = rowobj;
    console.log('this is id' + this.ApiObj);
    this.apiService.deleteMessageTemplatesByCampaign(this.ApiObj).toPromise().then(rdata => {
    console.log(rdata);
    this.ngOnInit();
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


