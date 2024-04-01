import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { SharedService } from '../../common/shared-service.service';
import { Subscription } from 'rxjs';
import { SPSideNavComponent } from '../../pharmacy/sp-side-nav/sp-side-nav.component';


@Component({
  selector: 'app-pharmacy-main',
  // standalone: true,
  // imports: [CommonModule,RouterOutlet,NavBarComponent,MatButtonModule,MatSidenavModule,MatInputModule,MatIconModule,SPSideNavComponent],
  templateUrl: './pharmacy-main.component.html',
  styleUrls: ['./pharmacy-main.component.css']
})
export class PharmacyMainComponent {

  constructor(private router: Router, private sharedService: SharedService) {
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route: any) => {
    //   this.navigateToDestination(route);
    // })
  }

  collapseNav() {
    this.sharedService.callOpenSideNavFunction('close');
  }
}
