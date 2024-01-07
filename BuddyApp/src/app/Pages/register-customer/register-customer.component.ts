import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, AbstractControl,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {EmailErrorStateMatcher} from './../../utility/Validators/EmailErrorStateMatcher';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {RegisterCustomerService} from "./register-customer.service";
import {PasswordConfirm} from "./chk-password";

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
  hidepw = true;
  hidecpw = true;
  pdmTxt = 'Confirm your password';
  firstFormGroup: any;
  secondFormGroup: any;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      nic: ['', Validators.required],
      contact_number_1: ['', Validators.required],
      password: ['', [Validators.required, PasswordConfirm()]],
      passwordC: ['', [Validators.required, PasswordConfirm()]]
    });
    this.secondFormGroup = this._formBuilder.group({
      lastCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });

    this.firstFormGroup.controls['passwordC'].valueChanges.subscribe((passwordC: any) => {
      // console.log(passwordC)
      if (passwordC !== this.firstFormGroup.get('password').value) {
        this.pdmTxt = 'Password does not match'
      }
      if (passwordC === '') {
        this.pdmTxt = 'Confirm your password'
      }
    });
  }

  // ValidatePasswordEql(control: AbstractControl) {
  //   // console.log(this.firstFormGroup)
  //   if (control.value !== '123') {
  //     // this.pdmTxt = 'Password does not match'
  //     return {invalidUrl: true};
  //   }
  //   // this.pdmTxt = 'Confirm your password'
  //   return null;
  // }

  chkPasswordC(password: any) {
    // console.log(password.value !== this.firstFormGroup.get('passwordC').value)
    // if (password.value !== this.firstFormGroup.get('passwordC').value) {
    //   this.pdm = true
    // } else {
    //   this.pdm = false
    // }
  }
}
