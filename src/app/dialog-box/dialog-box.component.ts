import { Component,  Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CampaignItems {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent {
  action: string;
  localdata: any;

  form: FormGroup = new FormGroup({
    campaignName: new FormControl('', [Validators.required]),
 });

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: CampaignItems) {
    console.log(data);
    this.localdata = {...data};
    this.action = this.localdata.action;
   }
   doAction() {
    this.dialogRef.close({event: this.action, data: this.localdata});
    console.log('this is campaign name' + this.localdata);
  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  submit() {
    console.log('submit logic');
  }
}
