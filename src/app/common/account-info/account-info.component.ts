import {Component, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {Router} from "@angular/router";
import {SharedService} from "../shared-service.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  // appUser;
  @Input() userType;

  weekdays = [
    {id: 0, name: 'Monday', open: '00:00', close: '00:00', io: false},
    {id: 1, name: 'Tuesday', open: '00:00', close: '00:00', io: false},
    {id: 2, name: 'Wednesday', open: '00:00', close: '00:00', io: false},
    {id: 3, name: 'Thursday', open: '00:00', close: '00:00', io: false},
    {id: 4, name: 'Friday', open: '00:00', close: '00:00', io: false},
    {id: 5, name: 'Saturday', open: '00:00', close: '00:00', io: false},
    {id: 6, name: 'Sunday', open: '00:00', close: '00:00', io: false}
  ]

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
  openOrClose

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

  getUser() {
    if (this.userType === 'customer') {
      this.http.get<any>(this.sharedService.publicUrl + 'customer/get/' + this.sharedService.getUserIdByLS()).subscribe(user => {
        this.userObj = user?.customer
        // console.log(this.userObj)
        this.setUser(this.userObj)
      })
    } else if (this.userType === 'pharmacy') {
      this.http.get<any>(this.sharedService.publicUrl + 'pharmacy/get/' + this.sharedService.getUserIdByLS()).subscribe(user => {
        this.userObj = user?.pharmacy
        if (this.userObj) {
          let duration = JSON.parse(this.userObj?.duration)
          for (let i = 0; i < 7; i++) {
            this.weekdays[i].open = duration[i].open
            this.weekdays[i].close = duration[i].close
            this.weekdays[i].io = duration[i].io === 1
          }
        }
        // console.log(this.userObj)
        this.setUser(this.userObj)
      })
    }
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
      if (this.userType === 'pharmacy') {
        this.daySlot = JSON.parse(userObj?.duration)[0]
        this.setSelectedDay(0)
      }
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
      console.log(this.firstFormGroup.value)
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

      if (this.userType === 'customer') {
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

      } else if (this.userType === 'pharmacy') {
        let duration = [];
        for (let i = 0; i < 7; i++) {
          duration.push({
            day: i,
            io: this.weekdays[i].io ? 1 : 0,
            open: this.weekdays[i].open,
            close: this.weekdays[i].close
          })
        }

        let pharmacy = {
          id: this.sharedService.getUserIdByLS(),
          duration: JSON.stringify(duration),
          appUser: {
            id: this.sharedService.getUserIdByLS(),
            address: userForm.address,
            town: userForm.town,
            contactDetails: JSON.stringify(contactDetails)
          }
        }

        this.http.put<any>(this.sharedService.publicUrl + 'pharmacy/update/' + pharmacy.id, pharmacy).subscribe((result) => {
          this.showEdit()
          this.userObj.appUser.address = pharmacy.appUser.address
          this.userObj.appUser.contactDetails = pharmacy.appUser.contactDetails
          // this.userObj.contactNumber_2 = customer.contactNumber_2
          this.userObj.appUser.town = pharmacy.appUser.town
          this.userObj.duration = pharmacy.duration
          this.setSelectedDay(0)

          this.setUser(this.userObj)
        }, (error) => {
          console.log(error)
          // this.success = 2;
        })

        // console.log(this.weekdays)
      }
    }
  }

  getDay(event) {
    const selectedId = event.target.value;
    this.setSelectedDay(selectedId)
  }

  setSelectedDay(selectedId) {
    let weekday = this.weekdays.find(option => option.id == selectedId);

    this.daySlot = JSON.parse(this.userObj?.duration)[weekday.id]
    this.openOrClose = this.daySlot.io
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

  formatTime(timeString) {
    if (timeString !== null) {
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }
    return ''
  }
}
