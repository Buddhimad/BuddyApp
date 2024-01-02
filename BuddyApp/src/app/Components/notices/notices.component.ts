import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared-service.service';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTooltipModule,MatMenuModule,MatChipsModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent {
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
 