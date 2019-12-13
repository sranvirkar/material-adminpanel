import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {Router} from "@angular/router"
import { APIService } from "../api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'admin-panel';
  mobileQuery: MediaQueryList;
  navBarOpened: boolean = true;
  loggedInUser: any = {};
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private apiService: APIService) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this.navBarOpened = !this.mobileQuery.matches;
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    let user = localStorage.getItem("loggedinuser");
    this.loggedInUser = user ? JSON.parse(user): {};
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(e) : void{
    console.log("clicked....");
    e.preventDefault();
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}
