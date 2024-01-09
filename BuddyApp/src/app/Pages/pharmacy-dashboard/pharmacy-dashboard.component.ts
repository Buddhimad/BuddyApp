import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared-service.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@Component({
  selector: 'app-pharmacy-dashboard',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTooltipModule,MatMenuModule,MatChipsModule,MatInputModule,MatFormFieldModule,NgxMaterialTimepickerModule],
  templateUrl: './pharmacy-dashboard.component.html',
  styleUrl: './pharmacy-dashboard.component.css'
})
export class PharmacyDashboardComponent {
  private subscription: Subscription;
  iscreatenoticeshow:Boolean=true;
  constructor(private router: Router, private sharedService: SharedService) {
    this.subscription = this.sharedService.routeControlFunction.subscribe((route:any)=>{
      this.navigateToDestination(route);
    })
   }
   navigateToDestination(destination:String) {
    if(destination=="/customer/dashboard/createnotice"){
      this.iscreatenoticeshow=false;
  }else{
    this.iscreatenoticeshow=true;
  }
    this.router.navigate([destination]);
  }
}
