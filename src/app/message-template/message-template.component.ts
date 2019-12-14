import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { APIService } from './../api.service';
import { DialogBoxComponent } from './../dialog-box/dialog-box.component'
import { UiService } from '../ui.service';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'body', 'campaignName', 'created_at', 'Action'];
  details: any;
  campaignList: any;
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
      this.getAllCampainList();
    }, err => {
      console.log(err);
      this.uiService.stopSpinner();
    });
  }

  getAllCampainList() {
    this.apiService.getAllCampaigns().subscribe(campList => {
      this.campaignList = campList;
      this.uiService.stopSpinner();
    }, err => {
      console.log(err);
      this.uiService.stopSpinner();
    });
  }

  openDialog(action, obj, campaignList) {
    const data = {
      type: "Message",
      action,
      campaignList,
      ...obj
    };
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: data
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
    const data = {
      campaign_id: rowobj.campaign_id,
      name: rowobj.name,
      messageBody: rowobj.message_body
    };
    console.log(data);
    this.uiService.showSpinner();
    this.apiService.saveMessageTemplate(JSON.stringify(data)).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
   });
  }

  updateRowData(rowobj) {    
    const data = {
      campaign_id: rowobj.campaign_id,
      name: rowobj.name,
      messageBody: rowobj.message_body,
      id: rowobj.id
    };
    console.log(data);
    this.uiService.showSpinner();
    this.apiService.updateMessageTemplate(JSON.stringify(data)).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
   });
  }

  deleteRowData(rowobj) {
    this.uiService.showSpinner();
    this.apiService.deleteMessageTemplatesByCampaign(rowobj.id).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
   });
  }
}


