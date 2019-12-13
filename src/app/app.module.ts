import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CampaignComponent } from './campaign/campaign.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { DialogBoxForMessageComponent } from './dialog-box-for-message/dialog-box-for-message.component';
import { AuthInterceptor } from './auth-interceptor';
import { MatSpinner } from '@angular/material';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CampaignComponent,
    MessageTemplateComponent,
    DialogBoxComponent,
    DialogBoxForMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200', 'https://sms-send-activity.herokuapp.com']
      }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [ 
    DialogBoxComponent,
    DialogBoxForMessageComponent,
    MatSpinner
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
