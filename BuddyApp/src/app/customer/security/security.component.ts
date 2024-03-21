import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {SharedService} from "../../common/shared-service.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {PasswordConfirm} from "../../validations/chk-password";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent implements OnInit {
  step = 0;
  hideoldpassword = true;
  hidenewpassword = true;
  hidereenterpassword = true;

  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;
  errFields = {
    pdmTxt: 'Confirm your password'
  }
  passwordFields = {
    oldPassword: "Enter your old password",
    password: "Enter your new password",
    passwordC: "Confirm your new password"
  }
  user;

  constructor(private sharedService: SharedService, private _formBuilder: FormBuilder, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.user = this.sharedService.getUserByLS()

    this.firstFormGroup = this._formBuilder.group({
      oldPassword: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      password: ['', [Validators.required, PasswordConfirm(this.errFields)]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      passwordC: ['', [Validators.required, PasswordConfirm(this.errFields, this.secondFormGroup)]],
    });

    this.firstFormGroup.controls['oldPassword'].valueChanges.subscribe(value => {
      if (value === '') {
        this.passwordFields.oldPassword = 'Enter your old password'
      } else {
        this.passwordFields.oldPassword = ''
        for (let i = 0; i < value.length; i++) {
          this.passwordFields.oldPassword += '*'
        }
      }
    });

    this.secondFormGroup.controls['password'].valueChanges.subscribe(value => {
      if (value === '') {
        this.passwordFields.password = 'Enter your new password'
      } else {
        this.passwordFields.password = ''
        for (let i = 0; i < value.length; i++) {
          this.passwordFields.password += '*'
        }
      }
    });

    this.thirdFormGroup.controls['passwordC'].valueChanges.subscribe(value => {
      if (value === '') {
        this.passwordFields.passwordC = 'Confirm your new password'
      } else {
        this.passwordFields.passwordC = ''
        for (let i = 0; i < value.length; i++) {
          this.passwordFields.passwordC += '*'
        }
      }
    });
  }

  onControlValueChange(v) {
    console.log(v)
    // doTheJobHere();
  }

  onSubmit(e: any) {
    console.log(this.thirdFormGroup.value)
    e.preventDefault()
    if (this.thirdFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      // let customerForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      // let noticeForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      let pharmacyForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);

      let pharmacy = {
        oldPassword: pharmacyForm.oldPassword,
        appUser: {
          id: this.sharedService.getUserIdByLS(),
          password: pharmacyForm.password
        }
      }
      this.http.put<any>(this.sharedService.publicUrl + 'app_user/reset_password/' + pharmacy.appUser.id, pharmacy).subscribe(result => {

      })
      // console.log(customer)
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(e) {
    e.preventDefault()
    if (this.firstFormGroup.valid) {
      this.step++;
    }
  }

  prevStep() {
    this.step--;
  }
}
