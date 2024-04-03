import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SharedService} from '../../common/shared-service.service';

@Component({
  selector: 'app-notices',
  // standalone: true,
  // imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatChipsModule],
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  private subscription: Subscription;
  iscreatenoticeshow: Boolean = true;
  notices = []

  // localStorage = this.document.defaultView?.localStorage;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router, private sharedService: SharedService) {
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route: any) => {
    //   this.navigateToDestination(route);
    // })
  }

  ngOnInit() {
    this.getNoticesCustomer()
  }

  navigateToDestination(destination: String) {
    // if (destination == "/customer/createnotice") {
    //   this.iscreatenoticeshow = false;
    // } else {
    //   this.iscreatenoticeshow = true;
    // }
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  getNoticesCustomer() {
    console.log(44)
    this.sharedService.getNoticesCustomer().subscribe((notices: []) => {
      // console.log(notices)
      notices.forEach(notice => {
        this.notices.push(notice)
      })
    })
  }
}
