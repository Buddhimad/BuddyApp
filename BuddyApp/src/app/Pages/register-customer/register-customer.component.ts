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
import {PasswordConfirm} from "../../validations/chk-password";

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

  provinces: any = []
  districts: any = []
  towns: any = []

  constructor(private _formBuilder: FormBuilder, private registerCustomerS: RegisterCustomerService) {
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
    // this.firstFormGroup = this._formBuilder.group({
    //   full_name: ['im', Validators.required],
    //   email: ['im', Validators.required],
    //   gender: ['Male', Validators.required],
    //   dob: ['2024-01-01', Validators.required],
    //   nic: ['95', Validators.required],
    //   contact_number_1: ['077', Validators.required],
    //   password: ['qwe', [Validators.required, PasswordConfirm()]],
    //   passwordC: ['qwe', [Validators.required, PasswordConfirm()]]
    // });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      town: ['', Validators.required]
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

    this.loadTowns()
  }

  loadTowns() {
    this.registerCustomerS.getTowns().subscribe((result) => {
      // console.log(towns)
      let provinces = result.towns.filter((obj: any, index: any, arr: any) => {
        // Check if the index of the first occurrence of the object with the same 'name'
        // is the same as the current index
        return arr.findIndex((item: any) => item.province_id === obj.province_id) === index;
      });

      // let provinces = new Set();
      // result.towns.forEach((town: any) => {
      //   provinces.add(town['province_name'])
      // })
      // this.provinces = provinces

      // let provincesArr = Array.from(provinces);
      // let districts = new Set();
      let towns: any[] = []
      // provinces.forEach((province: any) => {
      for (let i = 0; i < provinces.length; i++) {
        provinces[i] = {
          province_id: provinces[i].province_id,
          province_name: provinces[i].province_name,
        }
        // result.towns.forEach((town: any) => {
        //   if (provinces[i] === town['province_name']) {
        //     districts.add(town['district_name'])
        //   }
        // })
        let districts = result.towns.filter((obj: any, index: any, arr: any) => {
          return arr.findIndex((item: any) => item.province_id === obj.province_id && provinces[i].province_name === obj.province_name) === index;
        });


        // let districtsArr = Array.from(districts)

        for (let j = 0; j < districts.length; j++) {
          // districts[i] = {
          //   district_id: districts[i].district_id,
          //   district_name: districts[i].district_name,
          // }
          // let towns = result.towns.filter((obj: any, index: any, arr: any) => {
          //   return arr.findIndex((item: any) => item.district_id === obj.district_id && districts[i].district_name === obj.district_name) === index;
          // });
          result.towns.forEach((town: any) => {
            if (districts[j].district_id === town['district_id']) {
              towns.push({
                town_id: town.town_id,
                town_name: town.town_name
              })
            }
          })
          districts[j] = {
            district: {
              district_id: districts[j].district_id,
              district_name: districts[j].district_name,
            },
            towns: towns
          }
        }

        provinces[i] = {
          province: provinces[i],
          districts: districts
        }
      }
      // console.log(provinces)
      this.provinces = provinces
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
    e.preventDefault()
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      let customerForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      customerForm = JSON.parse(JSON.stringify(customerForm))
      // console.log(customerForm)
      customerForm.username = customerForm.email
      customerForm.user_id = '2222'
      // customerForm.district = customerForm.district.district.district_id
      // customerForm.province = customerForm.province.province.province_id
      customerForm.town_town_id = customerForm.town
      customerForm.user_verify = 1
      customerForm.user_type = 'customer'
      customerForm.created_at = '2023-02-02'
      customerForm.updated_at = '2023-02-02'
      customerForm.district = undefined
      customerForm.province = undefined
      console.log(customerForm)

      this.registerCustomerS.addCustomer(customerForm).subscribe((customer) => {
        // this.patient.patientId = patient.patientId;
        // this.success = 1;
      }, (error) => {
        console.log(error)
        // this.success = 2;
      })
    }
  }
}
