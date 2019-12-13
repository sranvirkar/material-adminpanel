import { Component,  Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CampaignItems  {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent implements OnInit {
  action: string;
  localdata: any;
  form: FormGroup;
  CampaignName: string;
  DataObj: any;
 // form: FormGroup = new FormGroup({
 //   campaignName: new FormControl('', [Validators.required]),
// });

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    public dialogRef2: MatDialogRef<DialogBoxComponent>,
    public dialogRef3: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CampaignItems) {
    console.log(data);
    this.localdata = {...data};
    this.action = this.localdata.action;
   }
   ngOnInit() {
    this.form = this.formBuilder.group({
      campaignName: [this.CampaignName, [
        Validators.required
      ]],
    });
    }
    public hasError = (controlName: string, errorName: string) => {
      return this.form.controls[controlName].hasError(errorName);
    }

   doAction() {
    if (this.form.valid && this.action === 'Add') {
    this.dialogRef.close({event: this.action, data: this.form.value});
    console.log('this is campaign name' + this.localdata);
    }
    if (this.form.valid && this.action === 'Update') {
       this.DataObj = ({"campaignName":""+this.localdata.Name+"","id":""+this.localdata.id+""});
      this.dialogRef2.close({event: this.action, data: this.DataObj});
      console.log('this is campaign name' + this.DataObj.campaignName);
      }
    if (this.action === 'Delete') {
        this.DataObj = this.localdata.id;
       this.dialogRef3.close({event: this.action, data: this.DataObj});
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
