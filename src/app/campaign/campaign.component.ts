import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


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

  displayedColumns: string[] = ['id', 'name', 'Action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
    let d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: rowobj.name
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
