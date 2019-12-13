import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  apiBase: string = "https://sms-send-activity.herokuapp.com/admin-panel";

  constructor(private httpClient: HttpClient) { }

  public authenticateUser(username: string, password: string){
    return this.httpClient.post(`${this.apiBase}/api/authUser`, {username:username, pass:password});
  }

  public isLoggedIn(){
    return !!localStorage.getItem('access_token');
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('loggedinuser');    
  }

  public getAllCampaigns(){
    return this.httpClient.get(`${this.apiBase}/api/getAllCampaigns`);
  }

  public getCampaign(campaignId: string){
    return this.httpClient.get(`${this.apiBase}/api/getAllCampaigns/${campaignId}`);
  }

  public getAllMessageTemplates(){
    return this.httpClient.get(`${this.apiBase}/api/getAllMessageTemplate`);
  }

  public getAllMessageTemplatesByCampaign(campaignId: string){
    return this.httpClient.get(`${this.apiBase}/api/getAllMessageTemplatesByCampaign/${campaignId}`);
  }

  public saveCampaign(campaignObj: any){
    //campaignObj = {campaignName:"name of the campaign"}
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/campaign/new`, campaignObj, httpOptions);
  }

  public saveMessageTemplate(messagetemplateObj: any){
    //messagetemplateObj = {campaign_id:"campaign_id", name: "message template name", messageBody: "message template body"}
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/messagetemplate/new`, messagetemplateObj, httpOptions);
  }
}
