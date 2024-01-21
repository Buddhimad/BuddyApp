import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-service-provider-account-security',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,MatButtonModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatNativeDateModule],
  templateUrl: './service-provider-account-security.component.html',
  styleUrl: './service-provider-account-security.component.css'
})
export class ServiceProviderAccountSecurityComponent {

  step = 0;
  hideoldpassword = true;
  hidenewpassword=true;
  hidereenterpassword=true;
  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
