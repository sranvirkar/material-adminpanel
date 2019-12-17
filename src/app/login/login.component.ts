import { MessageBoxComponent } from './../message-box/message-box.component';
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { EventEmitter } from 'events';
import {Router} from '@angular/router';
import { APIService } from '../api.service';
import { UiService } from '../ui.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTable, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, private apiService: APIService, private uiService: UiService, private _snackBar: MatSnackBar) { }

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
        //Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g),
       ])]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  openAlertBox(message, type){
    const messageBoxRef = this.dialog.open(MessageBoxComponent, {
      data: {message, type},
      minWidth: '300px',
      maxWidth: '400px'
    });
    messageBoxRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);
      this.uiService.showSpinner();
      this.apiService.authenticateUser(this.form.value.username, this.form.value.password).subscribe((data)=>{
        this.uiService.stopSpinner();
        if(data["valid"]){
          localStorage.setItem('access_token', data["token"]);
          localStorage.setItem('loggedinuser', JSON.stringify(data["data"]));
          this.router.navigate(['/home']);
        }else{
          console.log(data);
          this.uiService.stopSpinner();
          this.openAlertBox('Username or Password is incorrect.' , 'Error');
         // this._snackBar.open('Username or Password is incorrect.', '', {
          //  duration: 3000,
          //  panelClass: ['warn-snackbar']
         // });
        }
      }, (err) => {
        console.log(err);
        this.uiService.stopSpinner();
        this.errorHandling(err);
      });
    }
  }
  errorHandling(error) {
    if(error instanceof HttpErrorResponse && error.status !== 0) {
      this.openAlertBox('Sorry for inconvenience. Please try again later', 'Server Error !!! ');
    } else {
      this.openAlertBox('Sorry for inconvenience. Please try again later', 'Network Error !!! ');
    }
  }
}
