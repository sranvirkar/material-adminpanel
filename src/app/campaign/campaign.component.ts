import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { APIService } from '../api.service';
import { UiService } from '../ui.service';
import { MessageBoxComponent } from '../message-box/message-box.component'

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})

export class CampaignComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'created_at', 'Action'];
  ApiObj: any;
  details: any;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private apiService: APIService, private uiService: UiService) { }

  ngOnInit() {
    this.uiService.showSpinner();
    this.apiService.getAllCampaigns().subscribe(data => {
      console.log(data);
      this.uiService.stopSpinner();
      this.details = data;
    }, err => {
      this.uiService.stopSpinner();
      console.log(err);
    });
  }

  openDialog(action, obj) {
    const data = {
      type: "Campaign",
      action: action,
      ...obj
    };
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: data,
      minWidth: "315px"
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

  openAlertBox(message, type){
    const messageBoxRef = this.dialog.open(MessageBoxComponent, {
      data: {message, type},
      minWidth: '300px',
      maxWidth: '400px'
    });
    messageBoxRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  refreshTable() {
    this.apiService.getAllCampaigns().subscribe(data => {
      this.uiService.stopSpinner();
      this.details = data;
    }, err => {
      this.uiService.stopSpinner();
      console.log(err);
    });
  }

  addRowData(rowobj) {    
    const data = {
      campaignName: rowobj.name
    };
    console.log(data);
    this.uiService.showSpinner();
    this.apiService.saveCampaign(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
    });
  }

  updateRowData(rowobj) {
    const data = {
      campaignName: rowobj.name,
      id: rowobj.id
    };
    console.log(data);
    this.uiService.showSpinner();
    this.apiService.updateCampaign(JSON.stringify(data)).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
    }).catch(err => {
      console.log(err);
    });
  }

  deleteRowData(rowobj) {
    console.log(rowobj);
    this.uiService.showSpinner();
    this.apiService.deleteCampaign(rowobj.id).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
    }).catch(err => {
      console.log(err);
      this.uiService.stopSpinner();
      if(err.error && err.error.code === "23503"){
        this.openAlertBox("Unable to delete this Campaign. As some of message templates are associated with it.", "Error");
      }      
    });
  }
}
