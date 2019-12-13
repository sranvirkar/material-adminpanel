import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { EventEmitter } from 'events';
import {Router} from '@angular/router';
import { APIService } from '../api.service';

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

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: APIService) { }

  ngOnInit() {

    if(this.apiService.isLoggedIn()){
      this.router.navigate(['/home']);
    }

    this.form = this.formBuilder.group({
      username: [this.UserName, [
        Validators.required
      ]],
     password: [this.Password, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g),
       ])]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit() {
   if (this.form.valid) {
	this.submitEM.emit(this.form.value);
	console.log(this.form.value);
	this.apiService.authenticateUser(this.form.value.username, this.form.value.password).subscribe((data)=>{
	  if(data["valid"]){
		localStorage.setItem('access_token', data["token"]);
		localStorage.setItem('loggedinuser', this.form.value.username);
		this.router.navigate(['/home']);
	  }else{
		console.log(data);
	  }
	}, (err)=> {
	  console.log(err);
	});
  }
  }
}
