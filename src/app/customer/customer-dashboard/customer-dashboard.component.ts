import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "../../common/nav-bar/nav-bar.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {CustomerSideNavComponent} from "../customer-side-nav/customer-side-nav.component";
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterOutlet} from '@angular/router';
import {SharedService} from '../../common/shared-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-customer-dashboard',
  // standalone: true,
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  // imports: [CommonModule, NavBarComponent, MatButtonModule, MatSidenavModule, CustomerSideNavComponent, MatIconModule, RouterOutlet, MatInputModule]
})
export class CustomerDashboardComponent implements OnInit{
  private subscription: Subscription;
  iscreatenoticeshow: Boolean = true;

  constructor(private router: Router, private sharedService: SharedService) {
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route: any) => {
    //   this.navigateToDestination(route);
    // })
  }

  navigateToDestination(destination: String) {
    // this.sharedService.callOpenSideNavFunction('close');
    // if (destination == "/customer/createnotice") {
    //   this.iscreatenoticeshow = false;
    // } else {
    //   this.iscreatenoticeshow = true;
    // }
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  collapseNav() {
    this.sharedService.callOpenSideNavFunction('close');
  }

  ngOnInit(): void {
  }
}
