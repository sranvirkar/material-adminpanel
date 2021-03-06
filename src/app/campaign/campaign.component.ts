import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable, MatDialog, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { APIService } from '../api.service';
import { UiService } from '../ui.service';
import { MessageBoxComponent } from '../message-box/message-box.component';


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
  SuccessMsg: string = 'Success Message';

  constructor(public dialog: MatDialog, private apiService: APIService, private uiService: UiService) { }

  ngOnInit() {
    this.uiService.showSpinner();
	this.refreshTable();
  }

  applyFilter(filteValue: string){
    this.details.filter = filteValue.trim().toLowerCase();
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
	  const dataSource: any = data || [];
      this.details = new MatTableDataSource(dataSource);
	  this.uiService.stopSpinner();
    }, err => {
      this.uiService.stopSpinner();
      console.log(err);
      this.errorHandling(err);
    });
  }

  addRowData(rowobj) {
    const data = {
      campaignName: rowobj.name
    };
    console.log(data);
    this.uiService.showSpinner();
    this.apiService.saveCampaign(data).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
      this.openAlertBox('Campaign is Successfully Added', this.SuccessMsg);
    })
    .catch(err => {
      this.uiService.stopSpinner();
      console.log(err);
      this.errorHandling(err);
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
      this.openAlertBox('Campaign is Successfully Updated', this.SuccessMsg);
    }).catch(err => {
      this.uiService.stopSpinner();
      console.log(err);
      this.errorHandling(err);
    });
  }

  deleteRowData(rowobj) {
    console.log(rowobj);
    this.uiService.showSpinner();
    this.apiService.deleteCampaign(rowobj.id).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
      this.openAlertBox('Campaign is Successfully Deleted', this.SuccessMsg);
    }).catch(err => {
      console.log(err);
      this.uiService.stopSpinner();
      if(err.error && err.error.code === "23503"){
        this.openAlertBox("Unable to delete this Campaign. As some of message templates are associated with it.", "Error");
      }
      else {
        this.openAlertBox('Sorry for inconvenience. Please try again later', 'Server Error !!! ');
      }
    });
  }
  errorHandling(error) {
    if(error instanceof HttpErrorResponse && error.status !== 0) {
      this.openAlertBox('Sorry for inconvenience. Please try again later', 'Server Error !!! ');
    } else {
      this.openAlertBox('Sorry for inconvenience. Please try again later', 'Network Error !!! ');
    }
  }
}
