import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { APIService } from './../api.service';
import { DialogBoxForMessageComponent } from './../dialog-box-for-message/dialog-box-for-message.component';
import { UiService } from '../ui.service'

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
  displayedColumns: string[] = ['id', 'name', 'body', 'campaignName', 'created_at', 'Action'];
  dataSource = ELEMENT_DATA;
  details: any;
  DATA = [];
  varID: any;
  ApiObj: any;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private apiService: APIService, public dialog: MatDialog, private uiService: UiService) { }

  ngOnInit() {
    this.uiService.showSpinner();
    this.apiService.getAllMessageTemplates().subscribe(data => {
      console.log(data);
      this.details = data;
      this.uiService.stopSpinner();
    }, err => {
      console.log(err);
      this.uiService.stopSpinner();
    });
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxForMessageComponent, {
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

  refreshTable() {
    this.apiService.getAllMessageTemplates().subscribe(data => {
      this.details = data;
      this.uiService.stopSpinner();
    }, err => {
      console.log(err);
      this.uiService.stopSpinner();
    });
  }

  addRowData(rowobj) {
    //this.varID = 'ajinkya';
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj );
    this.uiService.showSpinner();
    this.apiService.saveMessageTemplate(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
   });
  }

  updateRowData(rowobj) {
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj);
    this.uiService.showSpinner();
    this.apiService.updateMessageTemplate(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
   });
  }
  deleteRowData( rowobj ) {
    this.ApiObj = rowobj;
    console.log('this is id' + this.ApiObj);
    this.uiService.showSpinner();
    this.apiService.deleteMessageTemplatesByCampaign(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
   });
  }
}


