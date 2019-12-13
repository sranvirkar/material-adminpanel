import { APIService } from './../api.service';
import { Component,  Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface MessageItems {
  id: number;
  name: string;
  body: string;
  cId: number;
}
@Component({
  selector: 'app-dialog-box-for-message',
  templateUrl: './dialog-box-for-message.component.html',
  styleUrls: ['./dialog-box-for-message.component.scss']
})
export class DialogBoxForMessageComponent implements OnInit {
  action: string;
  localdata: any;
  form: FormGroup;
  CampaignID: string;
  TemplateName: string;
  TemplateBody: string;
  details: any;
  DATA = [];
  DataObj: any;
 // form: FormGroup = new FormGroup({
   // CampaignName: new FormControl('', [Validators.required]),
    // TemplateName: new FormControl('', [Validators.required]),
    // TemplateBody: new FormControl('', [Validators.required]),
  // });
  constructor(private apiService: APIService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxForMessageComponent>,
    public dialogRef2: MatDialogRef<DialogBoxForMessageComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: MessageItems) {
    console.log(data);
    this.localdata = {...data};
    this.action = this.localdata.action;
   }
   ngOnInit() {
    this.apiService.getAllCampaigns().subscribe(data => {
      console.log(data);
      this.details = data;
      this.DATA = this.details;

    }, err => {
      console.log(err);
    });

    this.form = this.formBuilder.group({
      campaign_id: [this.CampaignID, [
        Validators.required
      ]], name: [this.TemplateName, [
        Validators.required
      ]], messageBody: [this.TemplateBody, [
        Validators.required
      ]]
    });
    }

    public hasError = (controlName: string, errorName: string) => {
      return this.form.controls[controlName].hasError(errorName);
    }

   doAction() {
    if (this.form.valid && this.action === 'Add') {
    this.dialogRef.close({event: this.action, data: this.form.value});
    }
    if (this.form.valid && this.action === 'Update') {
      this.DataObj = ({"campaign_id":""+this.localdata.campaign_id+"","name":""+this.localdata.name+"","messageBody":""+this.localdata.messageBody+"","id":""+this.localdata.id+""});
     this.dialogRef2.close({event: this.action, data: this.DataObj});
     console.log('this is campaign name' + this.DataObj.campaignName);
     }
    if (this.action === 'Delete') {
     this.DataObj = this.localdata.id;
     this.dialogRef2.close({event: this.action, data: this.DataObj});
     console.log('this is campaign name' + this.DataObj);
     }
}

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  submit() {
    console.log('submit logic');
  }

}
