import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {SharedService} from "../../common/shared-service.service";
import {HttpClient} from "@angular/common/http";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {PasswordConfirm} from "../../validations/chk-password";
import {ValidateNIC} from "../../validations/nic-validator";

@Component({
  selector: 'app-register-pharmacy',
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
  ],
  templateUrl: './register-pharmacy.component.html',
  styleUrl: './register-pharmacy.component.css',
})
export class RegisterPharmacyComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private sharedService: SharedService, private router: Router, private http: HttpClient) {
  }

  errFields = {
    pdmTxt: 'Confirm your password',
    nicTxt: 'NIC is required',
    contactTxts: ['Contact Number is required', ''],
    emailTxt: 'Email is required'
  }

  provinces: any = []
  districts: any = []
  towns: any = []

  firstFormGroup
  secondFormGroup
  thirdFormGroup

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerNic: ['', [Validators.required, ValidateNIC(this.errFields)]],
      contact_number_1: ['', [Validators.required, ValidateTelephone(this.errFields, 0)]],
      contact_number_2: ['', [ValidateTelephone(this.errFields, 1)]],
      name: ['', Validators.required],
      password: ['', [Validators.required, PasswordConfirm(this.errFields)]],
      passwordC: ['', [Validators.required, PasswordConfirm(this.errFields)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      ownerAddress: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      province: ['', Validators.required],
      district: ['', Validators.required],
      town: ['', Validators.required]
    });
    this.loadTowns()
  }


  // thirdFormGroup: FormGroup = this._formBuilder.group({
  //   province: ['', Validators.required],
  //   district: ['', Validators.required],
  //   town: ['', Validators.required]
  // });
  fourthFormGroup: FormGroup = this._formBuilder.group({forthCtrl: ['']});

  hidepw = true;
  hidecpw = true;
  linear = true;

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
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      let pharmacyForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);
      pharmacyForm = JSON.parse(JSON.stringify(pharmacyForm))

      let contactDetails = []
      contactDetails.push({
        number: pharmacyForm.contact_number_1
      })
      if (pharmacyForm.contact_number_2 !== undefined && pharmacyForm.contact_number_2 !== '') {
        contactDetails.push({
          number: pharmacyForm.contact_number_2
        })
      }
      // if (pharmacyForm.contact_number_2 !== undefined) {
      //   contactDetails.push({
      //     number: pharmacyForm.contact_number_2
      //   })
      // }

      //   email: ['im1@g.c', Validators.required],
      //     ownerName: ['im', Validators.required],
      //     ownerNic: ['961561150V', Validators.required],
      //     contact_number: ['0771234567', Validators.required],
      //     name: ['ga', Validators.required],
      //     password: ['111', Validators.required],
      //     passwordC: ['111', Validators.required],
      // });
      // this.secondFormGroup = this._formBuilder.group({
      //   ownerAddress: ['as', Validators.required],
      //   address: ['asd', Validators.required]
      // });
      // this.thirdFormGroup = this._formBuilder.group({
      //   province: ['', Validators.required],
      //   district: ['', Validators.required],
      //   town: ['', Validators.required]
      //
      let pharmacy = {
        ownerNic: pharmacyForm.ownerNic,
        ownerName: pharmacyForm.ownerName,
        ownerAddress: pharmacyForm.ownerAddress,
        appUser: {
          fullName: pharmacyForm.name,
          address: pharmacyForm.address,
          email: pharmacyForm.email,
          username: pharmacyForm.email,
          password: pharmacyForm.password,
          userType: 'pharmacy',
          userVerify: 1,
          town: {
            id: pharmacyForm.town
          },
          contactDetails: JSON.stringify(contactDetails)
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

      this.http.post<any>(this.sharedService.publicUrl + 'app_user/pharmacy_signup', pharmacy).subscribe((customer) => {
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

  navigateToDestination(destination: String) {
    this.router.navigate([destination]);
  }
}
