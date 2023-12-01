import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {SelectErrorStateMatcher} from './../../utility/Validators/SelectErrorStateMatcher';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-delivery-person',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './register-delivery-person.component.html',
  styleUrl: './register-delivery-person.component.css',
})
export class RegisterDeliveryPersonComponent {
  constructor(private _formBuilder: FormBuilder,private router: Router) {}
  hidepw=true;
  hidecpw=true;

  selected = new FormControl('valid', [Validators.required]);

  selectFormControl = new FormControl('valid', [Validators.required]);

  firstFormGroup = this._formBuilder.group({
    fullnameCtrl: ['', Validators.required],
    useremailCtrl:['', Validators.email]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  matcher = new SelectErrorStateMatcher();
  navigateToDestination(destination:String) {
    this.router.navigate([destination]);
  }
}
