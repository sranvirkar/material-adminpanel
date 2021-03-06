import { MessageBoxComponent } from './../message-box/message-box.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable, MatDialog, MatTableDataSource } from '@angular/material';
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
  SuccessMsg = 'Success Message';
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private apiService: APIService, public dialog: MatDialog, private uiService: UiService) { }

  async ngOnInit() {
    this.uiService.showSpinner();
	  await this.refreshTable();
	  this.getAllCampainList();
  }

  applyFilter(filterValue: string){
    this.details.filter = filterValue.trim().toLowerCase();
  }

  getAllCampainList() {
    this.apiService.getAllCampaigns().subscribe(campList => {
      this.campaignList = campList;
      this.uiService.stopSpinner();
    }, err => {
      console.log(err);
      this.uiService.stopSpinner();
      this.errorHandling(err);
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
    return new Promise((resolve, reject)=>{
      this.apiService.getAllMessageTemplates().subscribe(data => {
        const dataSource : any = data || [];
        this.details = new MatTableDataSource(dataSource);
        this.uiService.stopSpinner();
        resolve(true);
      }, err => {
        console.log(err);
        this.uiService.stopSpinner();
        this.errorHandling(err);
        reject(err);
      });
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
      this.openAlertBox('Message is Successfully Added', this.SuccessMsg);
   }).catch(err => {
    this.uiService.stopSpinner();
    console.log(err);
    this.errorHandling(err);
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
        this.openAlertBox('Message is Successfully Updated', this.SuccessMsg);
    }).catch(err => {
      this.uiService.stopSpinner();
      console.log(err);
      this.errorHandling(err);
    });
  }

  deleteRowData(rowobj) {
    this.uiService.showSpinner();
    this.apiService.deleteMessageTemplatesByCampaign(rowobj.id).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
      this.openAlertBox('Message is Successfully Deleted', this.SuccessMsg);
   }).catch(err => {
    this.uiService.stopSpinner();
    console.log(err);
    this.errorHandling(err);
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


