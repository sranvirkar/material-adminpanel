import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { APIService } from '../api.service';
import { UiService } from '../ui.service';


export interface CampaignItems {
  id: number;
  name: string;
}

const ELEMENT_DATA: CampaignItems[] = [
  {id: 1, name: 'Campaign1'},
  {id: 2, name: 'Campaign2'},
  {id: 3, name: 'Campaign3'},
  {id: 4, name: 'Campaign4'},
  {id: 5, name: 'Campaign5'}
];


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})

export class CampaignComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'created_at', 'Action'];
  dataSource = ELEMENT_DATA;
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
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
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
    this.apiService.getAllCampaigns().subscribe(data => {
      this.uiService.stopSpinner();
      this.details = data;
    }, err => {
      this.uiService.stopSpinner();
      console.log(err);
    });
  }

  addRowData(rowobj) {
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj);
    this.uiService.showSpinner();
    this.apiService.saveCampaign(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
    });
  }

  updateRowData(rowobj) {
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj);
    this.uiService.showSpinner();
    this.apiService.updateCampaign(this.ApiObj).toPromise().then(rdata => {
    console.log(rdata);
    this.refreshTable();
   });
  }
  deleteRowData( rowobj ) {
    this.ApiObj = rowobj;
    console.log('this is id' + this.ApiObj);
    this.uiService.showSpinner();
    this.apiService.deleteCampaign(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.refreshTable();
    });
  }

  AddCampaign() {
    console.log('Add logic');
  }
  Delete() {
    console.log('Del logic');
  }
  Edit() {
    console.log('Edit logic');
  }
}
