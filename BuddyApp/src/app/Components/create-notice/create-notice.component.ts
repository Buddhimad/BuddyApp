import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {RegisterCustomerService} from "../../Pages/register-customer/register-customer.service";
import {CreateNoticeService} from "./create-notice.service";
import {SharedService} from "../../Services/shared-service.service";

@Component({
  selector: 'app-create-notice',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.css',
})
export class CreateNoticeComponent implements OnInit {
  selectedNoticeType: any = 'pharmacy_notice';
  selected_package_type: any;
  selected_suitable_vehicle_type: any;
  firstFormGroup: any;
  secondFormGroup: any;

  provinces: any = []
  districts: any = []
  towns: any = []

  selectedArea = {
    province: '',
    district: '',
    town: ''
  }

  @ViewChild('stepper') private myStepper: MatStepper;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      person_name: ['', Validators.required],
      contact_number_1: ['', Validators.required],
      contact_number_2: [''],
      notice_txt: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      province: ['', Validators.required],
      district: ['', Validators.required],
      town: ['', Validators.required]
    });

    this.loadTowns()
  }

  isOptional = false;

  constructor(private _formBuilder: FormBuilder, private createNoticeS: CreateNoticeService, private sharedService: SharedService) {
  }

  // {value: 'delivery_notice', viewValue: 'Delivery Notice'}

  notice_types: any[] = [
    {value: 'pharmacy_notice', viewValue: 'Pharmacy Notice'}
  ];

  print(noticetype: any) {
    console.log(noticetype);
  }

  loadTowns() {
    this.sharedService.getTowns().subscribe(towns => {
      this.provinces = towns
    })
  }

  getDistricts(province: any) {
    if (province !== null) {
      this.districts = province.districts
    }
  }

  getTowns(district: any) {
    // this.registerCustomerS.getTowns(district).subscribe(result => {
    if (district !== null) {
      this.towns = district.towns
    }
    // })
  }

  onSubmit(e: any) {
    e.preventDefault()
    // console.log(JSON.parse(localStorage.getItem('user')))
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      let noticeForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      noticeForm = JSON.parse(JSON.stringify(noticeForm))
      // console.log(customerForm)
      // customerForm.username = customerForm.email
      noticeForm.notice_id = '2233'
      // customerForm.district = customerForm.district.district.district_id
      // customerForm.province = customerForm.province.province.province_id
      noticeForm.town_town_id = noticeForm.town.town_id
      // customerForm.user_verify = 1
      noticeForm.customer_customer_id = JSON.parse(localStorage.getItem('user'))['user_id']
      noticeForm.notice_type = 'customer_notice'
      noticeForm.created_at = '2023-02-02'
      noticeForm.updated_at = '2023-02-02'
      this.selectedArea.province = noticeForm.province.province.province_name
      this.selectedArea.district = noticeForm.district.district.district_name
      this.selectedArea.town = noticeForm.town.town_name
      // customerForm.district = undefined
      // customerForm.province = undefined
      console.log(noticeForm)

      this.createNoticeS.addNotice(noticeForm).subscribe((notice) => {
        this.myStepper.next();
        // this.patient.patientId = patient.patientId;
        // this.success = 1;
      }, (error) => {
        console.log(error)
        // this.success = 2;
      })
    }
  }
}
