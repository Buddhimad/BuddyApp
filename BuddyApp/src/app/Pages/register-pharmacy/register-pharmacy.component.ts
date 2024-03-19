import {Component, OnInit} from '@angular/core';
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
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {SharedService} from "../../Services/shared-service.service";

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
  constructor(private _formBuilder: FormBuilder, private sharedService: SharedService, private router: Router) {
  }

  errFields = {
    pdmTxt: 'Confirm your password',
    nicTxt: 'NIC is required',
    contactTxt: 'Contact Number is required',
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
      email: ['im@g.c', Validators.required],
      ownerName: ['im', Validators.required],
      ownerNic: ['961561150V', Validators.required],
      contact_no: ['0771234567', Validators.required],
      name: ['ga', Validators.required],
      password: ['111', Validators.required],
      passwordC: ['111', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      ownerAddress: ['as', Validators.required],
      address: ['asd', Validators.required]
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
  useremailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hidepw = true;
  hidecpw = true;
  linear = true;

  navigateToDestination(destination: String) {
    this.router.navigate([destination]);
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
}
