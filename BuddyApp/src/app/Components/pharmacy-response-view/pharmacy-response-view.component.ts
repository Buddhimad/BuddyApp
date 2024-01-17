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
  selector: 'app-pharmacy-response-view',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTooltipModule,MatMenuModule,MatChipsModule,MatInputModule,MatFormFieldModule,NgxMaterialTimepickerModule],
  templateUrl: './pharmacy-response-view.component.html',
  styleUrl: './pharmacy-response-view.component.css'
})
export class PharmacyResponseViewComponent {
  private subscription: Subscription;
  constructor(private router: Router, private sharedService: SharedService) {
    this.subscription = this.sharedService.routeControlFunction.subscribe((route:any)=>{
      this.navigateToDestination(route);
    })
   }
   navigateToDestination(destination:String) {
    this.router.navigate([destination]);
  }
}
