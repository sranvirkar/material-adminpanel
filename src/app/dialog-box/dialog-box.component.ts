import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  form: FormGroup = new FormGroup({
    campaignName: new FormControl('', [Validators.required]),
  });
  constructor() { }

  ngOnInit() {
  }

}
