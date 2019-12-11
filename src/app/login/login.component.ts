import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { EventEmitter } from 'events';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  UserName: string;
  Password: string;
  hide = true;
  @Output() submitEM = new EventEmitter();
  form: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [this.UserName, [
        Validators.required
      ]],
      password: [this.Password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]]
    });
  }
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.router.navigate(['/home']);
    }
  }
 // @Input() error: string | null;



}
