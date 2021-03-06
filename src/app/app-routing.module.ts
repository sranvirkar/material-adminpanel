import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component";
import { CampaignComponent } from "./campaign/campaign.component";
import { MessageTemplateComponent } from "./message-template/message-template.component";


const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: '', redirectTo: '/login', pathMatch: 'full'},
 {
   path: 'home',
   component: HomeComponent,
   children: [
      {path: '', redirectTo: 'campaign', pathMatch: 'full'},
      {path: 'campaign', component: CampaignComponent},
      {path: 'messagetemplate', component: MessageTemplateComponent},
      {path: 'user', component: UserComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
