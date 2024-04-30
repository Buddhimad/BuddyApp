import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedService} from "../../common/shared-service.service";
import {ValidateEmail} from "../../validations/email-validator";
import {ValidateNIC} from "../../validations/nic-validator";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {PasswordConfirm} from "../../validations/chk-password";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer-account',
  // standalone: true,
  // imports: [CommonModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule],
  // imports: [
  //   CommonModule,
  //   MatStepperModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatButtonModule,
  //   MatIconModule,
  //   MatSelectModule,
  //   MatDatepickerModule,
  //   MatNativeDateModule,
  //   AccountInfoComponent,
  // ],
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css']
})
export class CustomerAccountComponent implements OnInit {

  // showEdit() {
  //   if (this.isEditClick) {
  //     this.isEditClick = false;
  //   } else {
  //     this.isEditClick = true;
  //   }
  // }

  daySlot

  // pharmacyObj;

  isEditClick: Boolean = false;

  // user
  firstFormGroup: any;
  errFields = {
    contactTxts: ['Contact Number is required', ''],
    emailTxt: 'Email is required'
  }

  provinces: any = []
  districts: any = []
  towns: any = []

  userObj;
  openOrClose = {
    permanent: false,
    temporary: false
  }

  constructor(private _formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, private http: HttpClient) {
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
      town: ['', Validators.required],
      // email: ['', [Validators.required, ValidateEmail(this.errFields)]],
      // gender: ['', Validators.required],
      // dob: ['', Validators.required],
      // nic: ['', [Validators.required, ValidateNIC(this.errFields)]],
      contact_number_1: ['', [Validators.required, ValidateTelephone(this.errFields, 0)]],
      contact_number_2: ['', [ValidateTelephone(this.errFields, 1)]],
      // password: ['', [Validators.required, PasswordConfirm(this.errFields)]],
      // passwordC: ['', [Validators.required, PasswordConfirm(this.errFields)]]
    });

    this.loadTowns()
  }

  user

  getUser() {
    this.http.get<any>(this.sharedService.publicUrl + 'customer/get/' + this.sharedService.getUserIdByLS()).subscribe(user => {
      this.user = user
      this.userObj = user?.customer
      // console.log(this.user)
      this.setUser(this.userObj)
    })
  }

  setUser(userObj) {
    // console.log(JSON.parse(this.userObj?.duration)[0])
    this.firstFormGroup.controls.address.setValue(userObj?.appUser?.address);
    let provinceObj, districtObj, townObj
    this.provinces.find(province => {
      province.districts.find(district => {
        district.towns.find(town => {
          // console.log(appUser,town)
          if (town.id === userObj?.appUser?.town?.id) {
            // console.log(province,district,town)
            provinceObj = province
            districtObj = district
            townObj = town
          }
        })
        // return district.districtId ===townObj.id
      })
      // return obj.id === userObj.appUser.town.id
    })
    // console.log(provinceObj)
    this.getDistricts(provinceObj)
    this.getTowns(districtObj)
    this.firstFormGroup.controls.province.setValue(provinceObj);
    this.firstFormGroup.controls.district.setValue(districtObj);
    // this.user={
    //   customer: null
    // }
    if (this.userObj && this.userObj.appUser) {
      this.userObj.appUser.town = JSON.parse(JSON.stringify(townObj))
      this.userObj.appUser.town.district = JSON.parse(JSON.stringify(districtObj))
      this.userObj.appUser.town.district.province = JSON.parse(JSON.stringify(provinceObj))
      this.userObj.appUser.contactDetails = JSON.parse(userObj?.appUser?.contactDetails)
    }
    // this.userObj.appUser.town = townObj
    // this.userObj.appUser.town.district = districtObj
    // this.userObj.appUser.town.district.province = provinceObj
    let contactDetails = this.userObj?.appUser?.contactDetails
    this.firstFormGroup.controls.town.setValue(townObj);
    if (contactDetails !== undefined) {
      this.firstFormGroup.controls.contact_number_1.setValue(contactDetails[0]?.number);
      this.firstFormGroup.controls.contact_number_2.setValue(contactDetails[1]?.number);
    }
    // console.log(11,this.userObj)
  }

  onSubmit(e: any) {
    e.preventDefault()
    if (this.firstFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      // let customerForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      let userForm = JSON.parse(JSON.stringify(this.firstFormGroup.value))

      let contactDetails = []
      contactDetails.push({
        number: userForm.contact_number_1
      })
      if (userForm.contact_number_2 !== undefined && userForm.contact_number_2 !== '') {
        contactDetails.push({
          number: userForm.contact_number_2
        })
      }

      let customer = {
        id: this.sharedService.getUserIdByLS(),
        appUser: {
          id: this.sharedService.getUserIdByLS(),
          address: userForm.address,
          town: userForm.town,
          contactDetails: JSON.stringify(contactDetails)
        }
      }
      // console.log(customer)

      this.http.put<any>(this.sharedService.publicUrl + 'customer/update/' + customer.id, customer).subscribe((result) => {
        this.showEdit()
        this.userObj.appUser.address = customer.appUser.address
        this.userObj.appUser.contactDetails = customer.appUser.contactDetails
        // this.userObj.contactNumber_2 = customer.contactNumber_2
        this.userObj.appUser.town = customer.appUser.town
        this.setUser(this.userObj)
      }, (error) => {
        console.log(error)
        // this.success = 2;
      })
    }
  }

  loadTowns() {
    this.sharedService.getTowns().subscribe(towns => {
      // console.log(towns)
      this.provinces = towns
      this.getUser()
    })
  }

  getDistricts(province: any) {
    this.districts = this.sharedService.getDistrictsForProvince(province, this.firstFormGroup)
    // if (province !== undefined) {
    //   this.firstFormGroup.controls.district.setValue('');
    //   this.firstFormGroup.controls.town.setValue('');
    //   this.districts = province.districts
    // }
  }

  getTowns(district: any) {
    this.towns = this.sharedService.getTownsForDistrict(district, this.firstFormGroup)
    // this.registerCustomerS.getTowns(district).subscribe(result => {
    // if (district !== undefined) {
    //   this.firstFormGroup.controls.town.setValue('');
    //   this.towns = district.towns
    // }
    // })
  }
}
