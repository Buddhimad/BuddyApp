import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {SharedService} from "../shared-service.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {PasswordConfirm} from "../../validations/chk-password";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  step = 0;
  hideoldpassword = true;
  hidenewpassword = true;
  hidereenterpassword = true;

  mainFormGroup
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
      password: [''],
    });

    this.thirdFormGroup = this._formBuilder.group({
      passwordC: ['', [Validators.required, PasswordConfirm(this.errFields, this.secondFormGroup)]],
    });

    this.secondFormGroup.get('password').addValidators([Validators.required, PasswordConfirm(this.errFields, undefined, this.thirdFormGroup)]);

    // this.mainFormGroup = {
    //   firstFormGroup: this.firstFormGroup,
    //   secondFormGroup: this.secondFormGroup,
    //   thirdFormGroup: this.thirdFormGroup
    // };

    this.firstFormGroup.controls['oldPassword'].valueChanges.subscribe(value => {
      if (value !== null) {
        if (value === '') {
          this.passwordFields.oldPassword = 'Enter your old password'
        } else {
          this.passwordFields.oldPassword = ''
          for (let i = 0; i < value.length; i++) {
            this.passwordFields.oldPassword += '*'
          }
        }
      } else {
        this.passwordFields.oldPassword = 'Enter your old password'
      }
    });

    this.secondFormGroup.controls['password'].valueChanges.subscribe(value => {
      if (value !== null) {
        if (value === '') {
          this.passwordFields.password = 'Enter your new password'
        } else {
          this.passwordFields.password = ''
          for (let i = 0; i < value.length; i++) {
            this.passwordFields.password += '*'
          }
        }
        // this.thirdFormGroup.controls['passwordC'].setValue('')
      } else {
        this.passwordFields.password = 'Enter your new password'
      }
    });

    this.thirdFormGroup.controls['passwordC'].valueChanges.subscribe(value => {
      if (value !== null) {
        if (value === '') {
          this.passwordFields.passwordC = 'Confirm your new password'
        } else {
          this.passwordFields.passwordC = ''
          for (let i = 0; i < value.length; i++) {
            this.passwordFields.passwordC += '*'
          }
        }
      } else {
        this.passwordFields.passwordC = 'Confirm your new password'
      }
    });
  }

  // onControlValueChange(v) {
  //   console.log(v)
  //   // doTheJobHere();
  // }

  onSubmit(e: any) {
    // console.log(this.thirdFormGroup.value)
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
        this.resetForm()
      })
      // console.log(customer)
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(e) {
    e.preventDefault()
    // this.mainFormGroup.val++
    if (this.firstFormGroup.valid && this.step === 0) {
      this.step++;
    } else if (this.secondFormGroup.valid && this.step === 1) {
      this.step++;
    }
  }

  prevStep() {
    this.step--;
  }

  @ViewChild('firstFormDirective') firstFormDirective
  @ViewChild('secondFormDirective') secondFormDirective
  @ViewChild('thirdFormDirective') thirdFormDirective

  resetForm() {
    this.step = 0
    this.firstFormGroup.reset()
    this.secondFormGroup.reset()
    this.thirdFormGroup.reset()
    this.firstFormDirective.resetForm()
    this.secondFormDirective.resetForm()
    this.thirdFormDirective.resetForm()
  }
}
