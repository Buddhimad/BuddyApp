import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SharedService } from '../../Services/shared-service.service';

@Component({
  selector: 'app-customer-side-nav',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSidenavModule],
  templateUrl: './customer-side-nav.component.html',
  styleUrl: './customer-side-nav.component.css',
})
export class CustomerSideNavComponent implements OnDestroy, AfterViewInit {
  private subscription: Subscription;
  word = 'lorejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj';
  nativeElement: any;
  _document: any;
  isShowing = false;

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
    //   console.log(this.nativeElement);
    //  this.nativeElement.toggleClass("active");
    if (!this.isShowing) {
      return (this.isShowing = true);
    } else {
      return (this.isShowing = false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
