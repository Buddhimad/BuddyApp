import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Subscription} from 'rxjs';
import {SharedService} from '../../Services/shared-service.service';
import {MatListModule} from '@angular/material/list';
import {SideNavLiElement} from '../../Interfaces/side-nav-li-element';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRippleModule} from '@angular/material/core';
import {NoticesService} from "../notices/notices.service";


@Component({
  selector: 'app-customer-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    CdkDropList,
    CdkDrag,
    MatBadgeModule,
    MatRippleModule,
  ],
  templateUrl: './customer-side-nav.component.html',
  styleUrl: './customer-side-nav.component.css',
})
export class CustomerSideNavComponent implements OnDestroy, AfterViewInit, OnInit {
  private subscription: Subscription;
  nativeElement: any;
  _document: any;
  isShowing = false;
  imageUrl: any;
  user
  noticesCount = 0

  constructor(
    private sharedService: SharedService,
    @Inject(DOCUMENT) _document: Document,
    private noticesService: NoticesService
  ) {
    this._document = _document;
    // this.subscription = this.sharedService.sharedFunction$.subscribe(() => {
    //   this.openDrawerFunction();
    // });
    this.subscription = this.sharedService.sideNavControlFunction.subscribe((user: any) => {
      console.log(user);
      // if(user=='sp'){
      this.openDrawerFunction();
      // }
    })
  }

  ngAfterViewInit(): void {
    this.nativeElement = this._document.getElementById(
      'customer-side-navigation'
    );
  }

  openDrawerFunction() {
    if (!this.isShowing) {
      return (this.isShowing = true);
    } else {
      return (this.isShowing = false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // {
  //   name: 'Delivery',
  //   path: 'notice/delivery',
  //   icon: 'local_shipping',
  //   response_count: 150,
  // },
  side_nav_list: SideNavLiElement[] = [
    {
      name: 'All',
      path: 'customer/dashboard',
      icon: 'home',
      response_count: this.noticesCount,
    },
    {
      name: 'Pharmacy',
      path: 'notice/pharmacy',
      icon: 'medication',
      response_count: 100,
    }
  ];

  settings_list = [
    {
      name: 'Verify Account',
      path: 'customer/dashboard/verify/account',
      icon: 'verified_user',
      response_count: 250,
    },
    {
      name: 'Security',
      path: 'customer/dashboard/security',
      icon: 'security',
      response_count: 250,
    },
    {
      name: 'Profile',
      path: 'customer/dashboard/account',
      icon: 'account_circle',
      response_count: 250,
    },
  ];


  onRippleClick(): void {
    // Handle the click event here
    // console.log('Ripple effect clicked!');
  }

  changeRoutes(route: String) {
    this.sharedService.callChangeRouteFunction(route);
  }

  ngOnInit(): void {
    this.user = this.sharedService.getUserByLS()
    this.getNoticesCustomer()
  }



  getNoticesCustomer() {
    this.sharedService.notices.subscribe((notices: []) => {
      this.noticesCount = notices.length
    })
  }
}
