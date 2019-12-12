import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CampaignComponent } from './campaign/campaign.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { DialogBoxForMessageComponent } from './dialog-box-for-message/dialog-box-for-message.component';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [ DialogBoxComponent,
    DialogBoxForMessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
