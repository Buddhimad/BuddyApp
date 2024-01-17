import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SharedService} from '../../Services/shared-service.service';
import {CustomerDashboardService} from "../../Pages/customer-dashboard/customer-dashboard.service";

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatChipsModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit {
  private subscription: Subscription;
  iscreatenoticeshow: Boolean = true;
  notices: any[] = []

  constructor(private router: Router, private sharedService: SharedService, private customerDashboardService: CustomerDashboardService) {
    this.subscription = this.sharedService.routeControlFunction.subscribe((route: any) => {
      this.navigateToDestination(route);
    })
  }

  ngOnInit() {
    this.getNoticesCustomer()
  }

  navigateToDestination(destination: String) {
    if (destination == "/customer/dashboard/createnotice") {
      this.iscreatenoticeshow = false;
    } else {
      this.iscreatenoticeshow = true;
    }
    this.router.navigate([destination]);
  }

  getNoticesCustomer() {
    this.customerDashboardService.getNoticesCustomer('234').subscribe(result => {
      this.notices = result.notices
      console.log(result.notices)
    })
  }
}
