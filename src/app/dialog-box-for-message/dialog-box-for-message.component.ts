import { Component,  Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface MessageItems {
  id: number;
  name: string;
  body: string;
  campaignName: string;
}
@Component({
  selector: 'app-dialog-box-for-message',
  templateUrl: './dialog-box-for-message.component.html',
  styleUrls: ['./dialog-box-for-message.component.scss']
})
export class DialogBoxForMessageComponent  {
  action: string;
  localdata: any;
  form: FormGroup = new FormGroup({
    CampaignName: new FormControl('', [Validators.required]),
    TemplateName: new FormControl('', [Validators.required]),
    TemplateBody: new FormControl('', [Validators.required]),
  });
  constructor(public dialogRef: MatDialogRef<DialogBoxForMessageComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: MessageItems) {
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
