import { Component,  Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent implements OnInit {
  localdata: any;
  form: FormGroup;
  CampaignName: string;
  CampaignID: string;
  TemplateBody: string;
  TemplateName: string;
  DataObj: any;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.localdata = {...data};
   }

   ngOnInit() {
      const fieldsToValidate = this.getFieldsForValidation(this.localdata.type);
      this.form = this.formBuilder.group(fieldsToValidate);
    }

    getFieldsForValidation(type) {
      let fields = null;
      switch(type){
        case 'Campaign':
            fields = {
              name: [this.CampaignName, [
                Validators.required
              ]]
            };
          break;
        case 'Message':
          fields = {
            campaign_id: [this.CampaignID, [
              Validators.required
            ]],
            message_body: [this.TemplateBody, [
              Validators.required
            ]],
            name: [this.TemplateName, [
              Validators.required
            ]]
          };
          break;
      }
      return fields;
    }

    public hasError = (controlName: string, errorName: string) => {
      return this.form.controls[controlName].hasError(errorName);
    }

   submit() {
    if (this.form.valid) {
      switch(this.localdata.action) {
        case 'Add':
          this.dialogRef.close({event: this.localdata.action, data: this.form.value});
          break;
        case 'Update':
          this.dialogRef.close({event: this.localdata.action, data: this.localdata});
          break;
      }
    }
    if(this.localdata.action === "Delete"){
      this.dialogRef.close({event: this.localdata.action, data: this.localdata});
    }
  }
}
