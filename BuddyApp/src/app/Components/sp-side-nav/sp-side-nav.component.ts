import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SharedService } from '../../Services/shared-service.service';
import { MatListModule } from '@angular/material/list';
import { SideNavLiElement } from '../../Interfaces/side-nav-li-element';
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
  isOpen = false;
  private subscription: Subscription;

  constructor(private sharedService: SharedService) {
    // this.subscription = this.sharedService.sharedFunction$.subscribe(() => {
    //   console.log("fucked SP");
    //   this.openDrawerFunction();
    // });
    this.subscription=this.sharedService.sideNavControlFunction.subscribe((user:any)=>{
      console.log(user);
       // if(user=='sp'){
          this.openDrawerFunction();
       // }
    })
  }
  openDrawerFunction() {
    if (!this.isOpen) {
      return (this.isOpen = true);
    } else {
      return (this.isOpen = false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  side_nav_list: SideNavLiElement[] = [
    {
      name: 'Received',
      path: 'sp/pharmacy/dashboard',
      icon: 'home',
      response_count: 250,
    },
    {
      name: 'Responded',
      path: 'sp/pharmacy/respond',
      icon: 'back_hand',
      response_count: 100,
    },
  ];

  settings_list = [
    {
      name: 'Verify Account',
      path: 'sp/pharmacy/verify',
      icon: 'verified_user',
      response_count: 250,
    },
    {
      name: 'Security',
      path: 'sp/pharmacy/security',
      icon: 'security',
      response_count: 250,
    },
    {
      name: 'Profile',
      path: 'sp/pharmacy/account',
      icon: 'account_circle',
      response_count: 250,
    }
  ];
  onRippleClick(): void {}

  changeRoutes(route: String) {
    this.sharedService.callChangeRouteFunction(route);
  }

  
}

