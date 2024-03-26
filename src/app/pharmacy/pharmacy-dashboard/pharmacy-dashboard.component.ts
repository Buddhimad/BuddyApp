import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SharedService} from '../../common/shared-service.service';
import {MatInputModule} from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NativeDateAdapter} from '@angular/material/core';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-pharmacy-dashboard',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatChipsModule, MatInputModule, MatFormFieldModule, NgxMaterialTimepickerModule, MatDatepickerModule, JsonPipe, MatNativeDateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pharmacy-dashboard.component.html',
  styleUrl: './pharmacy-dashboard.component.css'
})
export class PharmacyDashboardComponent {
  value = '';
  private subscription: Subscription;

  constructor(private router: Router, private sharedService: SharedService) {
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route:any)=>{
    //   console.log(route);
    //   this.navigateToDestination(route);
    // })
  }

  navigateToDestination(destination: String) {
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
