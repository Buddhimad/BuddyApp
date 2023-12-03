import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CustomerSideNavComponent } from "../../Components/customer-side-nav/customer-side-nav.component";

@Component({
    selector: 'app-customer-dashboard',
    standalone: true,
    templateUrl: './customer-dashboard.component.html',
    styleUrl: './customer-dashboard.component.css',
    imports: [CommonModule, NavBarComponent, MatButtonModule, MatSidenavModule, CustomerSideNavComponent]
})
export class CustomerDashboardComponent {

}
