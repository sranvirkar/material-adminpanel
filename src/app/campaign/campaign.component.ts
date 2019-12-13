import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { APIService } from '../api.service';


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
  resourcesLoaded = false;
  displayedColumns: string[] = ['id', 'name', 'Action'];
  dataSource = ELEMENT_DATA;
  ApiObj: any;
  details: any;
  DATA = [];
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getAllCampaigns().subscribe(data => {
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
    const dialogRef = this.dialog.open(DialogBoxComponent, {
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
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj);
    this.apiService.saveCampaign(this.ApiObj).toPromise().then(rdata => {
      console.log(rdata);
      this.resourcesLoaded = false;
      this.ngOnInit();
    });
  //  let d = new Date();
  //  this.dataSource.push({
  //    id: d.getTime(),
  //    name: rowobj.name
  //  });
  //  this.table.renderRows();

  }

  updateRowData(rowobj) {
    this.ApiObj = JSON.stringify(rowobj);
    console.log('this is JSONString' + this.ApiObj);
    this.apiService.updateCampaign(this.ApiObj).toPromise().then(rdata => {
    console.log(rdata);
    this.ngOnInit();
   });
  }
  deleteRowData( rowobj ) {
    this.ApiObj = rowobj;
    console.log('this is id' + this.ApiObj);
    this.apiService.deleteCampaign(this.ApiObj).toPromise().then(rdata => {
    console.log(rdata);
    this.ngOnInit();
   });
  }

 // openDialog(): void {
 //   this.dialog.open(DialogBoxComponent, {
  //    width: '300px',
  //  });
//  }

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
