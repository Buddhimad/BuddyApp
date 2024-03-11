import {Component, OnInit, ViewChild} from '@angular/core';
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
import {PasswordConfirm} from "../../validations/chk-password";
import {MatStepper} from '@angular/material/stepper';
import {ValidateNIC} from "../../validations/nic-validator";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {ValidateEmail} from "../../validations/email-validator";
import {SharedService} from "../../Services/shared-service.service";

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
  errFields = {
    pdmTxt: 'Confirm your password',
    nicTxt: 'NIC is required',
    contactTxt: 'Contact Number is required',
    emailTxt: 'Email is required'
  }
  firstFormGroup: any;
  secondFormGroup: any;

  provinces: any = []
  districts: any = []
  towns: any = []

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private registerCustomerS: RegisterCustomerService, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, ValidateEmail(this.errFields)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      nic: ['', [Validators.required, ValidateNIC(this.errFields)]],
      contact_number_1: ['', [Validators.required, ValidateTelephone(this.errFields, false)]],
      password: ['', [Validators.required, PasswordConfirm(this.errFields)]],
      passwordC: ['', [Validators.required, PasswordConfirm(this.errFields)]]
    });
    // this.firstFormGroup = this._formBuilder.group({
    //   full_name: ['im', Validators.required],
    //   email: ['im@g.c', [Validators.required, ValidateEmail(this.errFields)]],
    //   gender: ['Male', Validators.required],
    //   dob: ['2024-01-01', Validators.required],
    //   nic: ['951661520V', [Validators.required, ValidateNIC(this.errFields)]],
    //   contact_number_1: ['0771234567', [Validators.required, ValidateTelephone(this.errFields, false)]],
    //   password: ['qwe', [Validators.required, PasswordConfirm(this.errFields)]],
    //   passwordC: ['qwe', [Validators.required, PasswordConfirm(this.errFields)]]
    // });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      town: ['', Validators.required]
    });

    this.loadTowns()
  }

  loadTowns() {
    // this.sharedService.getTowns()
    // console.log(22)
    this.sharedService.getTowns().subscribe(towns => {
      this.provinces = towns
      // console.log(this.provinces)
    })
  }

  getDistricts(province: any) {
    this.districts = province.districts
  }

  getTowns(district: any) {
    // this.registerCustomerS.getTowns(district).subscribe(result => {
    this.towns = district.towns
    // })
  }

  onSubmit(e: any) {
    // console.log(2233)
    e.preventDefault()
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      let customerForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      customerForm = JSON.parse(JSON.stringify(customerForm))
      let customer = {
        nic: customerForm.nic,
        gender: customerForm.gender,
        dob: customerForm.dob,
        contactNumber_1: customerForm.contact_number_1,
        contactNumber_2: customerForm.contact_number_2,
        appUser: {
          fullName: customerForm.full_name,
          address: customerForm.address,
          email: customerForm.email,
          username: customerForm.email,
          password: customerForm.password,
          userType: 'customer',
          userVerify: 1,
          town: {
            id: customerForm.town
          }
        }
      }
      // console.log(customerForm)
      // customerForm.username = customerForm.email
      // customerForm.user_id = '2233'
      // customerForm.district = customerForm.district.district.district_id
      // customerForm.province = customerForm.province.province.province_id
      // customerForm.town_town_id = customerForm.town
      // customerForm.userVerify = 1
      // customerForm.userType = 'customer'
      // customerForm.created_at = '2023-02-02'
      // customerForm.updated_at = '2023-02-02'
      // customerForm.district = undefined
      // customerForm.province = undefined
      // console.log(customer)

      this.registerCustomerS.addCustomer(customer).subscribe((customer) => {
        this.myStepper.next();
        // this.patient.patientId = patient.patientId;
        // this.success = 1;
      }, (error) => {
        console.log(error)
        // this.success = 2;
      })
    }
  }

  resetForm() {
    this.router.navigate(['/'])
  }
}
