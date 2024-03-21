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
  selector: 'app-verify-pharmacy-account',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,MatButtonModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatNativeDateModule],
  templateUrl: './verify-pharmacy-account.component.html',
  styleUrl: './verify-pharmacy-account.component.css'
})
export class VerifyPharmacyAccountComponent {
  step = 0;

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
