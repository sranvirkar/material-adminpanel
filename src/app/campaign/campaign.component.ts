import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

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
