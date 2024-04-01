import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from "@angular/router";
import {WelcomeService} from "../../common/welcome/welcome.service";
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
import {AccountInfoComponent} from "../../common/account-info/account-info.component";

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
  // isEditClick: Boolean = false;
  // user = {
  //   fullName: '',
  //   address: '',
  //   province_name: '',
  //   district_name: '',
  //   town_name: '',
  //   contact_number_1: '',
  //   contact_number_2: ''
  // }

  // user
  // firstFormGroup: any;
  // errFields = {
  //   contactTxts: ['Contact Number is required', ''],
  //   emailTxt: 'Email is required'
  // }
  //
  // provinces: any = []
  // districts: any = []
  // towns: any = []

  // localStorage = this.document.defaultView?.localStorage;

  constructor(@Inject(DOCUMENT) private document: Document,
              private _formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, private http: HttpClient) {
  }

  // showEdit() {
  //   if (this.isEditClick) {
  //     this.isEditClick = false;
  //   } else {
  //     this.isEditClick = true;
  //   }
  // }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   address: ['', Validators.required],
    //   province: ['', Validators.required],
    //   district: ['', Validators.required],
    //   town: ['', Validators.required],
    //   // email: ['', [Validators.required, ValidateEmail(this.errFields)]],
    //   // gender: ['', Validators.required],
    //   // dob: ['', Validators.required],
    //   // nic: ['', [Validators.required, ValidateNIC(this.errFields)]],
    //   contact_number_1: ['', [Validators.required, ValidateTelephone(this.errFields, 0)]],
    //   contact_number_2: ['', [ValidateTelephone(this.errFields, 1)]],
    //   // password: ['', [Validators.required, PasswordConfirm(this.errFields)]],
    //   // passwordC: ['', [Validators.required, PasswordConfirm(this.errFields)]]
    // });
    //
    // this.loadTowns()
  }

  // getCustomer() {
  //   this.http.get<any>(this.sharedService.publicUrl + 'customer/get/' + this.sharedService.getUserIdByLS()).subscribe(user => {
  //     // console.log(user)
  //     this.user = user
  //     // this.setUser(user)
  //   })
  // }
  //
  // setUser(user) {
  //   console.log(user)
  //   this.firstFormGroup.controls.address.setValue(user?.customer.appUser.address);
  //   // let province = this.provinces.find(obj => {
  //   //   return obj.id === user.customer.appUser.town.district.province.id
  //   // })
  //   // this.firstFormGroup.controls.province.setValue(province);
  //   // this.getDistricts(province)
  //   // let district = this.districts.find(obj => {
  //   //   return obj.id === user.customer.appUser.town.district.id
  //   // })
  //   // this.firstFormGroup.controls.district.setValue(district);
  //   // this.getTowns(district)
  //   let provinceObj, districtObj, townObj
  //   this.provinces.find(province => {
  //     province.districts.find(district => {
  //       district.towns.find(town => {
  //         if (town.id === user?.customer.appUser.town.id) {
  //           // console.log(province,district,town)
  //           provinceObj = province
  //           districtObj = district
  //           townObj = town
  //         }
  //       })
  //       // return district.districtId ===townObj.id
  //     })
  //     // return obj.id === user.customer.appUser.town.id
  //   })
  //   // console.log(provinceObj)
  //   this.getDistricts(provinceObj)
  //   this.getTowns(districtObj)
  //   this.firstFormGroup.controls.province.setValue(provinceObj);
  //   this.firstFormGroup.controls.district.setValue(districtObj);
  //   // this.user={
  //   //   customer: null
  //   // }
  //   if (this.user && this.user.customer && this.user.customer.appUser) {
  //     this.user.customer.appUser.town = JSON.parse(JSON.stringify(townObj))
  //     this.user.customer.appUser.town.district = JSON.parse(JSON.stringify(districtObj))
  //     this.user.customer.appUser.town.district.province = JSON.parse(JSON.stringify(provinceObj))
  //     this.user.customer.appUser.contactDetails = JSON.parse(user?.customer?.appUser.contactDetails)
  //   }
  //   // this.user.customer.appUser.town = townObj
  //   // this.user.customer.appUser.town.district = districtObj
  //   // this.user.customer.appUser.town.district.province = provinceObj
  //   let contactDetails = this.user?.customer?.appUser.contactDetails
  //   this.firstFormGroup.controls.town.setValue(townObj);
  //   if (contactDetails !== undefined) {
  //     this.firstFormGroup.controls.contact_number_1.setValue(contactDetails[0]?.number);
  //     this.firstFormGroup.controls.contact_number_2.setValue(contactDetails[1]?.number);
  //   }
  // }
  //
  // loadTowns() {
  //   this.sharedService.getTowns().subscribe(towns => {
  //     // console.log(towns)
  //     this.provinces = towns
  //     this.getCustomer()
  //   })
  // }
  //
  // getDistricts(province: any) {
  //   if (province !== undefined) {
  //     this.districts = province.districts
  //   }
  // }
  //
  // getTowns(district: any) {
  //   // this.registerCustomerS.getTowns(district).subscribe(result => {
  //   if (district !== undefined) {
  //     this.towns = district.towns
  //   }
  //   // })
  // }
  //
  // onSubmit(e: any) {
  //   e.preventDefault()
  //   if (this.firstFormGroup.valid) {
  //     // console.log(this.firstFormGroup.value)
  //     // console.log(this.secondFormGroup.value)
  //     // let customerForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
  //     let customerForm = JSON.parse(JSON.stringify(this.firstFormGroup.value))
  //     // console.log(customerForm)
  //     // customerForm.username = customerForm.email
  //     // customerForm.user_id = this.sharedService.getUserId()
  //     // customerForm.customer_id = this.sharedService.getUserId()
  //     // customerForm.district = customerForm.district.district.district_id
  //     // customerForm.province = customerForm.province.province.province_id
  //     // customerForm.town_town_id = customerForm.town
  //     // customerForm.user_verify = 1
  //     // customerForm.user_type = 'customer'
  //     // customerForm.created_at = '2023-02-02'
  //     // customerForm.updated_at = '2023-02-02'
  //     // customerForm.district = undefined
  //     // customerForm.province = undefined
  //     // console.log(customerForm.contact_number_2 !== '')
  //
  //     let contactDetails = []
  //     contactDetails.push({
  //       number: customerForm.contact_number_1
  //     })
  //     if (customerForm.contact_number_2 !== undefined && customerForm.contact_number_2 !== '') {
  //       contactDetails.push({
  //         number: customerForm.contact_number_2
  //       })
  //     }
  //
  //     let customer = {
  //       customerId: this.sharedService.getUserIdByLS(),
  //       appUser: {
  //         id: this.sharedService.getUserIdByLS(),
  //         address: customerForm.address,
  //         town: customerForm.town,
  //         contactDetails: JSON.stringify(contactDetails)
  //       }
  //     }
  //     // console.log(customer)
  //
  //     this.http.put<any>(this.sharedService.publicUrl + 'customer/update/' + customer.customerId, customer).subscribe((result) => {
  //       this.showEdit()
  //       this.user.customer.appUser.address = customer.appUser.address
  //       this.user.customer.appUser.contactDetails = customer.appUser.contactDetails
  //       // this.user.customer.contactNumber_2 = customer.contactNumber_2
  //       this.user.customer.appUser.town = customer.appUser.town
  //       this.setUser(this.user)
  //     }, (error) => {
  //       console.log(error)
  //       // this.success = 2;
  //     })
  //   }
  // }
}
