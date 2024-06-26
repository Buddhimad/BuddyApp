import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Subscription} from 'rxjs';
import {SharedService} from '../../common/shared-service.service';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
// import {
//   CdkDragDrop,
//   moveItemInArray,
//   CdkDrag,
//   CdkDropList,
// } from '@angular/cdk/drag-drop';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRippleModule} from '@angular/material/core';


@Component({
  selector: 'app-customer-side-nav',
  // standalone: true,
  // imports: [
  //   CommonModule,
  //   MatButtonModule,
  //   MatSidenavModule,
  //   MatListModule,
  //   MatDividerModule,
  //   MatIconModule,
  //   MatDividerModule,
  //   MatChipsModule,
  //   CdkDropList,
  //   CdkDrag,
  //   MatBadgeModule,
  //   MatRippleModule,
  // ],
  templateUrl: './customer-side-nav.component.html',
  styleUrls: ['./customer-side-nav.component.css'],
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
  ) {
    this._document = _document;
    // this.subscription = this.sharedService.sharedFunction$.subscribe(() => {
    //   this.openDrawerFunction();
    // });
    this.subscription = this.sharedService.sideNavControlSubject.subscribe((type: any) => {
      // console.log(user);
      // if(user=='sp'){
      this.openDrawerFunction(type);
      // }
    })
  }

  ngAfterViewInit(): void {
    this.nativeElement = this._document.getElementById(
      'customer-side-navigation'
    );
  }

  openDrawerFunction(type) {
    if (type === 'switch') {
      if (!this.isShowing) {
        this.isShowing = true;
      } else {
        this.isShowing = false;
      }
    } else if (type === 'close') {
      this.isShowing = false;
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
  side_nav_list = [
    {
      name: 'Dashboard',
      path: 'customer/dashboard',
      icon: 'home',
      response_count: this.noticesCount,
    },
    // {
    //   name: 'Pharmacy',
    //   path: 'notice/pharmacy',
    //   icon: 'medication',
    //   response_count: 100,
    // }
  ];

  settings_list = [
    {
      name: 'Verify Account',
      path: 'customer/verify/account',
      icon: 'verified_user',
      response_count: 250,
    },
    {
      name: 'Security',
      path: 'customer/security',
      icon: 'security',
      response_count: 250,
    },
    {
      name: 'Profile',
      path: 'customer/account',
      icon: 'account_circle',
      response_count: 250,
    },
  ];


  // onRippleClick(): void {
  //   // Handle the click event here
  //   // console.log('Ripple effect clicked!');
  //   this.isShowing = false
  // }

  changeRoutes(route: String) {
    this.sharedService.callChangeRouteFunction(route);
    this.openDrawerFunction('close')
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
