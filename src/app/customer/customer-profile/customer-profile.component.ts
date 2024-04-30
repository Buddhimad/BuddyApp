import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SharedService} from "../../common/shared-service.service";
import {HttpClient} from "@angular/common/http";
import {ValidateTelephone} from "../../validations/telephone-validator";

@Component({
  selector: 'app-customer-profile',
  // standalone: true,
  // imports: [CommonModule,MatIconModule,MatButtonModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  @Input() user
  @Output() goBackFunc: EventEmitter<any> = new EventEmitter();
  // userObj;
  firstFormGroup

  reviewStars = []
  reviewVal = 0
  submitted = false

  constructor(private _formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, private http: HttpClient) {
  }

  ngOnInit(): void {
    // console.log(this.user)
    // this.user = this.user.customer
    try {
      this.user.appUser.contactDetails = JSON.parse(this.user?.appUser?.contactDetails)
    } catch (e) {

    }
    this.firstFormGroup = this._formBuilder.group({
      // reviewVal: ['', Validators.required],
      reviewTxt: ['', Validators.required],
    });
    this.setStars(this.reviewStars.length)
    // this.getUser(this.id)
  }

  onSubmit(e: any) {
    // console.log(2233)
    this.submitted = true
    e.preventDefault()
    if (this.firstFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      // let reviewForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
      let reviewForm = JSON.parse(JSON.stringify(this.firstFormGroup.value))

      // let contactDetails = []
      // contactDetails.push({
      //   number: reviewForm.contact_number_1
      // })
      // if (reviewForm.contact_number_2 !== undefined && reviewForm.contact_number_2 !== '') {
      //   contactDetails.push({
      //     number: reviewForm.contact_number_2
      //   })
      // }

      let review = {
        reviewVal: this.reviewVal,
        reviewTxt: reviewForm.reviewTxt,
        appUserPostedBy: {
          id: this.sharedService.getUserIdByLS()
        },
        appUser: {
          id: this.user.appUser.id
        }
      }
      // console.log(customerForm)
      // customerForm.username = customerForm.email
      // customerForm.user_id = '2233'
      // customerForm.district = customerForm.district.district.district_id
      // customerForm.province = customerForm.province.province.province_id
      // customerForm.town_town_id = customerForm.town
      // customerForm.userVerify = 1
      // customerForm.userType = 'user'
      // customerForm.created_at = '2023-02-02'
      // customerForm.updated_at = '2023-02-02'
      // customerForm.district = undefined
      // customerForm.province = undefined
      // console.log(review)

      this.http.post<any>(this.sharedService.publicUrl + 'app_user/add_review', review).subscribe((user) => {
        this.resetForm()
        // this.myStepper.next();
        // this.patient.patientId = patient.patientId;
        // this.success = 1;
      }, (error) => {
        console.log(error)
        // this.success = 2;
      })
    }
  }

  setStars(val) {
    this.reviewStars = []
    this.reviewVal = val
    // this.reviewVal = Array(val).fill()
    for (let i = 0; i < val; i++) {
      this.reviewStars.push({
        rated: true
      })
    }
    for (let i = val; i < 5; i++) {
      this.reviewStars.push({
        rated: false
      })
    }
    // console.log(this.reviewVal)
  }

  // getUser(id) {
  //   this.http.get<any>(this.sharedService.publicUrl + 'user/get/' + id).subscribe(user => {
  //     this.user = user?.user
  //     this.user.appUser.contactDetails = JSON.parse(this.user?.appUser?.contactDetails)
  //     // console.log(this.user)
  //     // this.setUser(this.user)
  //   })
  // }

  @ViewChild('reviewBtn') reviewBtn: ElementRef;
  @ViewChild('firstFormDirective') firstFormDirective

  resetForm() {
    // console.log(55)
    this.firstFormGroup.reset()
    this.setStars(0)
    // this.reviewVal = 0
    this.submitted = false
    this.firstFormDirective.resetForm()
    // this.reviewBtn.nativeElement.click();
    // this.firstIsSubmitted = false
    // this.firstFormGroup.get('person_name').reset()
    // setInterval(()=>{
    //   console.log(55)
    //   this.firstFormGroup.reset()
    //   this.secondFormGroup.reset()
    // },2000)


    // this.router.navigate(['/'])
  }

  goBack() {
    this.goBackFunc.emit(false)
    // this.pharmacyDashboardService.filterNoticesVal = 1
    // this.router.navigate(['/pharmacy/dashboard'])
  }
}
