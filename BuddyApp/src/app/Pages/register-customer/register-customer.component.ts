import { Component, OnInit } from '@angular/core';
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
import { EmailErrorStateMatcher } from './../../utility/Validators/EmailErrorStateMatcher';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-register-customer',
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
    MatNativeDateModule,
  ],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css',
})
export class RegisterCustomerComponent implements OnInit {
  firstFormGroup: any;
  secondFormGroup: any;
  hidepw=true;
  hidecpw=true;
  addressvalue='';fullnameValue='';useremailValue="";nicValue="";contactnoValue="";

  constructor(private _formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      fullnameCtrl: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
      ],
      birthdayCtrl: ['', Validators.required],
      nicnoCtrl:['',Validators.required],
      contactnoCtrl:['',Validators.required],
      pwCtrl:['',Validators.required],
      cpwCtrl:['',Validators.required]
    });
    this.firstFormGroup.get('fullnameCtrl').valueChanges.subscribe(() => {
      this.firstFormGroup.get('fullnameCtrl').invalid &&
        this.firstFormGroup.get('fullnameCtrl').touched;
    });

    this.secondFormGroup = this._formBuilder.group({
      addressCtrl:['',Validators.required],
      provinceCtrl:['',Validators.required],
      districtCtrl:['',Validators.required],
      townCtrl:['',Validators.required]
    });
  }

 

  useremailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  navigateToDestination(destination:String) {
    this.router.navigate([destination]);
  }

  genderFormControl = new FormControl(null, [Validators.required]);

  email_error_state_matcher = new EmailErrorStateMatcher();
}
