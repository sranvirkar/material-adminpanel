import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  apiBase: string = 'https://sms-send-activity.herokuapp.com/admin-panel';

  constructor(private httpClient: HttpClient) { }

  public authenticateUser(username: string, password: string) {
    return this.httpClient.post(`${this.apiBase}/api/authUser`, { username:username, pass: password});
  }

  public isLoggedIn(){
    return !!localStorage.getItem('access_token');
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('loggedinuser');
  }

  public getAllCampaigns() {
    return this.httpClient.get(`${this.apiBase}/api/getAllCampaigns`);
  }

  public getCampaign(campaignId: string){
    return this.httpClient.get(`${this.apiBase}/api/getAllCampaigns/${campaignId}`);
  }

  public getAllMessageTemplates(){
    return this.httpClient.get(`${this.apiBase}/api/getAllMessageTemplates`);
  }

  public getAllMessageTemplatesByCampaign(campaignId: string){
    return this.httpClient.get(`${this.apiBase}/api/getAllMessageTemplatesByCampaign/${campaignId}`);
  }

  public saveCampaign(campaignObj: any) {
    //campaignObj = {campaignName: campaignObj.name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/campaign/new`, campaignObj, httpOptions);
  }

  public saveMessageTemplate(messagetemplateObj: any) {
    console.log('this is obj at save message function ' + messagetemplateObj );
    //messagetemplateObj = {campaign_id:"campaign_id", name: "message template name", messageBody: "message template body"}
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/messagetemplate/new`, messagetemplateObj, httpOptions);
  }
  public updateCampaign(campaignObj: any) {
    //campaignObj = {campaignName: campaignObj.name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/campaign/update`, campaignObj, httpOptions);
  }
  public updateMessageTemplate(messagetemplateObj: any) {
    //messagetemplateObj = {campaign_id:"campaign_id", name: "message template name", messageBody: "message template body"}
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/messagetemplate/update`, messagetemplateObj, httpOptions);
  }
  public deleteCampaign(Id: any){
    return this.httpClient.get(`${this.apiBase}/api/campaign/delete/${Id}`);
  }
  public deleteMessageTemplatesByCampaign(Id: any){
    return this.httpClient.get(`${this.apiBase}/api/messagetemplate/delete/${Id}`);
  }

  public getAllUsers() {
    return this.httpClient.get(`${this.apiBase}/api/getAllUsers`);
  }
  public saveUser(userObj: any) {
    //campaignObj = {campaignName: campaignObj.name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/user/new`, userObj, httpOptions);
  }
  public updateUser(userObj: any) {
    //campaignObj = {campaignName: campaignObj.name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/user/update`, userObj, httpOptions);
  }
}
