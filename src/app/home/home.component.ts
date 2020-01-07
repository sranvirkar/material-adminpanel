
import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild  } from '@angular/core';
import {Router} from "@angular/router"
import { APIService } from "../api.service";
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isDisabled: boolean;
  user: boolean;
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
    this.user = false;

  }
  ngOnInit() {
    let user = localStorage.getItem("loggedinuser");
    this.loggedInUser = user ? JSON.parse(user): {};
    if (this.loggedInUser.isadmin === true) {
      this.isDisabled = true;
      console.log(this.loggedInUser);
    }
    else {
      this.isDisabled = false;
      console.log(this.loggedInUser);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.user = false;
  }
  logout(e) : void{
    console.log("clicked....");
    e.preventDefault();
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
  User(e) : void {
    console.log("clicked....");
    e.preventDefault();
    this.user = true;
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}

