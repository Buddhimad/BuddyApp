import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pharmacy',
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
  ],
  templateUrl: './register-pharmacy.component.html',
  styleUrl: './register-pharmacy.component.css',
})
export class RegisterPharmacyComponent {
  constructor(private _formBuilder: FormBuilder,private router: Router) {}
  firstFormGroup: FormGroup = this._formBuilder.group({
    pharmacynameCtrl: ['',Validators.required],
    ownersnamectrl: [''],
    ownernicctrl: [''],
    ownercontactnoctrl: [''],
  });
  secondFormGroup: FormGroup = this._formBuilder.group({ 
    secondCtrl: [''] ,
    pharmacyaddressctrl:[''],
    owneraddressctrl:['']
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({ thirdCtrl: [''] });
  fourthFormGroup: FormGroup = this._formBuilder.group({ forthCtrl: [''] });
  useremailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pharmacynameFormControl = new FormControl('', [Validators.required]);
  useremailvalue = '';
  pharmacynamevalue = '';
  ownersnamevalue = '';
  ownernicvalue = '';
  ownercontactnovalue = '';
  pharmacyaddressvalue='';
  owneraddressvalue='';
  hidepw = true;
  hidecpw = true;
  linear = true;

  navigateToDestination(destination:String) {
    this.router.navigate([destination]);
  }
}
