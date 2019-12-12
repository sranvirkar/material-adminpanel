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
 // password = new FormControl('', [Validators.required, Validators.minLength(8),
 //   Validators.maxLength(16), Validators.pattern(/^[!@#\$%\^\&*\)\(+=._-]{8,}$/g ) ]);

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [this.UserName, [
        Validators.required
      ]],
     password: [this.Password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g ),
       // Validators.pattern(/^[a-zA-Z0-9]+$/g )
       ]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  // getErrorMessage() {
  //  if (this.password.hasError('required')) {

  //    return 'You must enter a password' ;
  // }
  //  if (this.password.hasError('minlength')) {
  //    return 'Minimum 8 characters' ;

 // }
  //  if (this.password.hasError('maxlength')) {
  //    return 'Maximum 16 characters' ;
 // }
  //  if (this.password.hasError('pattern')) {
   //   return 'Atleast 1 special symbol is required' ;
 // }

       //     '';
 // }
  submit() {
   if (this.form.valid) {
   this.submitEM.emit(this.form.value);
   this.router.navigate(['/home']);
   // }
  }
 // @Input() error: string | null;


  }
}
