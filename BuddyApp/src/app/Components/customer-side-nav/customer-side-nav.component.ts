import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
export class CustomerSideNavComponent implements OnDestroy, AfterViewInit {
  private subscription: Subscription;
  nativeElement: any;
  _document: any;
  isShowing = false;
  imageUrl: any;

  constructor(
    private sharedService: SharedService,
    @Inject(DOCUMENT) _document: Document
  ) {
    this._document = _document;
    this.subscription = this.sharedService.sharedFunction$.subscribe(() => {
      this.openDrawerFunction();
    });
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
      path: 'notice',
      icon: 'home',
      response_count: 250,
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
      name: 'Security',
      path: 'security',
      icon: 'security',
      response_count: 250,
    },
    {
      name: 'Profile',
      path: 'profile',
      icon: 'account_circle',
      response_count: 250,
    },
  ];



  onRippleClick(): void {
    // Handle the click event here
    console.log('Ripple effect clicked!');
  }
}
