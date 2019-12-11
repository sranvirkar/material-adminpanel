import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-dialog-box-for-message',
  templateUrl: './dialog-box-for-message.component.html',
  styleUrls: ['./dialog-box-for-message.component.scss']
})
export class DialogBoxForMessageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    CampaignName: new FormControl('', [Validators.required]),
    TemplateName: new FormControl('', [Validators.required]),
    TemplateBody: new FormControl('', [Validators.required]),
  });
  constructor() { }

  ngOnInit() {
  }

}
