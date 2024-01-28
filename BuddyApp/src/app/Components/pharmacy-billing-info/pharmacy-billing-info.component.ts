import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {NativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-pharmacy-billing-info',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [CommonModule,MatExpansionModule,MatIconModule,MatButtonModule,MatInputModule,MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule,MatNativeDateModule],
  templateUrl: './pharmacy-billing-info.component.html',
  styleUrl: './pharmacy-billing-info.component.css'
})
export class PharmacyBillingInfoComponent {
  panelOpenState = false;
  status="complete";/**complete/pending/failed */
  status1="pending";
}
