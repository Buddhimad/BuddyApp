import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { SharedService } from '../../Services/shared-service.service';
import { Subscription } from 'rxjs';
import { SPSideNavComponent } from '../../Components/sp-side-nav/sp-side-nav.component';


@Component({
  selector: 'app-service-provider-index',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavBarComponent,MatButtonModule,MatSidenavModule,MatInputModule,MatIconModule,SPSideNavComponent],
  templateUrl: './service-provider-index.component.html',
  styleUrl: './service-provider-index.component.css'
})
export class ServiceProviderIndexComponent {

}
