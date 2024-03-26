import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SharedService } from '../../common/shared-service.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-sp-side-nav',
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
  templateUrl: './sp-side-nav.component.html',
  styleUrl: './sp-side-nav.component.css',
})
export class SPSideNavComponent {
  isShowing = false;
  private subscription: Subscription;

  constructor(private sharedService: SharedService) {
    // this.subscription = this.sharedService.sharedFunction$.subscribe(() => {
    //   console.log("fucked SP");
    //   this.openDrawerFunction();
    // });
    this.subscription=this.sharedService.sideNavControlSubject.subscribe((type)=>{
      // console.log(type);
       // if(user=='sp'){
          this.openDrawerFunction(type);
       // }
    })
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

  side_nav_list = [
    {
      name: 'Received',
      path: 'pharmacy/dashboard',
      icon: 'home',
      response_count: 250,
    },
    {
      name: 'Responded',
      path: 'pharmacy/respond',
      icon: 'back_hand',
      response_count: 100,
    },
  ];

  settings_list = [
    {
      name: 'Verify Account',
      path: 'pharmacy/verify',
      icon: 'verified_user',
      response_count: 250,
    },
    {
      name: 'Security',
      path: 'pharmacy/security',
      icon: 'security',
      response_count: 250,
    },
    {
      name: 'Profile',
      path: 'pharmacy/account',
      icon: 'account_circle',
      response_count: 250,
    },
    {
      name: 'Billing',
      path: 'pharmacy/billing',
      icon: 'payments',
      response_count: 250,
    }
  ];
  // onRippleClick(): void {}

  changeRoutes(route: String) {
    this.sharedService.callChangeRouteFunction(route);
    this.openDrawerFunction('close')
  }


}

