import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SharedService} from '../../common/shared-service.service';
import {MatInputModule} from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NativeDateAdapter} from '@angular/material/core';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClient} from "@angular/common/http";
import {ImageViewerComponent} from "../../common/image-viewer/image-viewer.component";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {ValidatePrescription} from "../../validations/prescription-validator";

@Component({
  selector: 'app-pharmacy-dashboard',
  // standalone: true,
  // providers: [NativeDateAdapter],
  // imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatChipsModule, MatInputModule, MatFormFieldModule, NgxMaterialTimepickerModule, MatDatepickerModule, JsonPipe, MatNativeDateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pharmacy-dashboard.component.html',
  styleUrls: ['./pharmacy-dashboard.component.css']
})
export class PharmacyDashboardComponent implements OnInit {
  value = '';
  // private subscription: Subscription;

  notices = []
  respFormGroup
  submitted = false

  constructor(private router: Router, private sharedService: SharedService, private http: HttpClient,
              private _formBuilder: FormBuilder) {
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route:any)=>{
    //   console.log(route);
    //   this.navigateToDestination(route);
    // })
  }

  ngOnInit(): void {
    this.getNoticesPharmacy()
    this.respFormGroup = this._formBuilder.group({
      availability: [true],
      price: ['', Validators.required],
      responseTxt: [''],
      time: ['']
    });
  }

  getNoticesPharmacy() {
    // console.log(44)
    this.http.get<any>(this.sharedService.publicUrl + 'notice/get_notices_pharmacy/' + this.sharedService.getUserByLS().townId).subscribe((notices: []) => {
      this.notices = notices
      console.log(notices)
      // for (let notice of notices) {
      //   // notices.forEach(notice => {
      //   this.notices.push(notice)
      // }
    })
  }

  onSubmit(e, noticeObj) {
    e.preventDefault()
    this.submitted = true
    // console.log(JSON.parse(localStorage.getItem('user')))
    if (this.respFormGroup.valid) {
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      let noticeForm = Object.assign(this.respFormGroup.value);
      // // customerForm.district = undefined
      // // customerForm.province = undefined
      // console.log(noticeForm)

      let c_notice = {
        availability: noticeForm.availability ? 1 : 0,
        price: noticeForm.price,
        responseTxt: noticeForm.responseTxt,
        notice: {
          id: noticeObj?.notice?.id
        }
      };

      // const HttpUploadOptions = {
      //   headers: new HttpHeaders({"Content-Type": "multipart/form-data"})
      // }
      // console.log(JSON.stringify(c_notice))
      // console.log(c_notice)
      this.http.post(this.sharedService.publicUrl + 'notice/add_response_pharmacy', c_notice).subscribe((notice) => {
        if (notice) {
          noticeObj.responded = true
          console.log(noticeObj)
        }
        //   // this.patient.patientId = patient.patientId;
        //   // this.success = 1;
      }, (error) => {
        console.log(error)
        //   // this.success = 2;
      })

      // this.http.post<any>(this.sharedService.publicUrl + 'notice/add_response_pharmacy', c_notice).subscribe((notice) => {
      //   noticeObj.responded = true
      //   // this.myStepper.next();
      //   // this.patient.patientId = patient.patientId;
      //   // this.success = 1;
      // }, (error) => {
      //   console.log(error)
      //   // this.success = 2;
      // })
    }
  }

  navigateToDestination(destination: String) {
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  getContactDetails(notice) {
    return JSON.parse(notice?.customer?.appUser.contactDetails)
  }

  @ViewChild(ImageViewerComponent) imgViewer;

  viewImg(file) {
    this.imgViewer.viewImg(file)
  }
}
