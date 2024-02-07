import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from "@angular/router";
import {WelcomeService} from "../../Pages/welcome/welcome.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedService} from "../../Services/shared-service.service";
import {ValidateEmail} from "../../validations/email-validator";
import {ValidateNIC} from "../../validations/nic-validator";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {PasswordConfirm} from "../../validations/chk-password";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-customer-account',
  standalone: true,
  // imports: [CommonModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule],
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
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent implements OnInit {
  isEditClick: Boolean = false;
  user = {
    full_name: '',
    address: '',
    province_name: '',
    district_name: '',
    town_name: ''
  }
  firstFormGroup: any;

  provinces: any = []
  districts: any = []
  towns: any = []

  constructor(private _formBuilder: FormBuilder, private router: Router, private sharedService: SharedService) {
  }

  showEdit() {
    if (this.isEditClick) {
      this.isEditClick = false;
    } else {
      this.isEditClick = true;
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      town: ['', Validators.required]
      // email: ['', [Validators.required, ValidateEmail(this.errFields)]],
      // gender: ['', Validators.required],
      // dob: ['', Validators.required],
      // nic: ['', [Validators.required, ValidateNIC(this.errFields)]],
      // contact_number_1: ['', [Validators.required, ValidateTelephone(this.errFields)]],
      // password: ['', [Validators.required, PasswordConfirm(this.errFields)]],
      // passwordC: ['', [Validators.required, PasswordConfirm(this.errFields)]]
    });

    this.loadTowns()
  }

  getUser() {
    this.sharedService.getUser().subscribe(user => {
      // console.log(user)
      this.user = user
      this.firstFormGroup.controls.address.setValue(user.address);
      // let province = {
      //   province: {
      //     province_id: user.province_id,
      //     province_name: user.province_name
      //   }
      // }
      this.firstFormGroup.controls.province.setValue(user.province_id);
      this.getDistricts(user.province_id)
      this.firstFormGroup.controls.district.setValue(user.district_id);
      this.getTowns(user.district_id)
      this.firstFormGroup.controls.town.setValue(user.town_id);
    })
  }

  loadTowns() {
    // this.sharedService.getTowns()
    // console.log(22)
    this.sharedService.getTowns().subscribe(towns => {
      this.provinces = towns
      this.getUser()
      // console.log(this.provinces)
    })
  }

  getDistricts(provinceId: any) {
    // console.log(this.provinces)
    let province = this.provinces.find(obj => {
      return obj.province.province_id === provinceId
    })
    // console.log(province)
    this.districts = province.districts
  }

  getTowns(districtId: any) {
    // this.registerCustomerS.getTowns(district).subscribe(result => {
    let district = this.districts.find(obj => {
      return obj.district.district_id === districtId
    })
    this.towns = district.towns
    // })
  }
}
