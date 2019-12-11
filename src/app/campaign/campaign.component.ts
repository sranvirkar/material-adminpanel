import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['id', 'name', 'delete'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialog.open(DialogBoxComponent, {
      width: '300px',
    });
  }
  AddCampaign() {
    console.log('Add logic');
  }
}
