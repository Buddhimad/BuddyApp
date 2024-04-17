import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
import {IMqttMessage, MqttService} from "ngx-mqtt";

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

  noticesTown = []
  noticesDistrict = []
  noticesProvince = []

  viewNotice = false

  respFormGroup
  submitted = false

  noticeObj

  notices = []

  constructor(private router: Router, private sharedService: SharedService, private http: HttpClient,
              private _formBuilder: FormBuilder, private _mqttService: MqttService) {
    this.subscribeNewTopic()
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route:any)=>{
    //   console.log(route);
    //   this.navigateToDestination(route);
    // })
  }

  ngOnInit(): void {
    this.getNoticesPharmacy()
    this.respFormGroup = this._formBuilder.group({
      availability: [true],
      price: [''],
      responseTxt: [''],
      time: ['']
    });
  }

  getNoticesPharmacy() {
    // console.log(44)
    this.http.get<any>(this.sharedService.publicUrl + 'notice/get_notices_pharmacy/' + this.sharedService.getUserByLS().townId).subscribe((noticesTown: []) => {
      this.noticesTown = noticesTown
      this.notices = noticesTown.slice()
      // for (let notice of this.notices) {
      //   notice['seen'] = false
      //   if (notice.responded) {
      //     notice['seen'] = true
      //   }
      // }
      // console.log(noticesTown)
      // for (let notice of noticesTown) {
      //   // noticesTown.forEach(notice => {
      //   this.noticesTown.push(notice)
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
        id: noticeObj?.response.id,
        // notice: {
        //   id: noticeObj?.notice?.id
        // },
        // pharmacy: {
        //   id: this.sharedService.getUserIdByLS()
        // },
        accepted: 2
      };

      // const HttpUploadOptions = {
      //   headers: new HttpHeaders({"Content-Type": "multipart/form-data"})
      // }
      // console.log(JSON.stringify(c_notice))
      // console.log(c_notice)
      this.http.post(this.sharedService.publicUrl + 'notice/add_response_pharmacy', c_notice).subscribe((response) => {
        if (response) {
          noticeObj.response = response
          noticeObj.responded = true
          // console.log(noticeObj)
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

  getContactDetails(notice) {
    return JSON.parse(notice?.customer?.appUser.contactDetails)
  }

  funcViewNotice(noticeObj, view) {
    if (view) {
      console.log(noticeObj)
      this.noticeObj = noticeObj;
      this.viewNotice = true
      if (!noticeObj.seen) {
        let c_notice = {
          notice: {
            id: noticeObj?.notice?.id
          },
          pharmacy: {
            id: this.sharedService.getUserIdByLS()
          },
          accepted: 1
        };

        this.http.post(this.sharedService.publicUrl + 'notice/msg_read_pharmacy', c_notice).subscribe((response) => {
          if (response) {
            noticeObj.response = response
            noticeObj.seen = true
            // console.log(noticeObj)
          }
        }, (error) => {
          console.log(error)
          //   // this.success = 2;
        })
      }
    } else {
      this.viewNotice = false
    }
  }

  @ViewChild(ImageViewerComponent) imgViewer;

  viewImg(file) {
    this.imgViewer.viewImg(file)
  }

  subscribeNewTopic(): void {
    let that = this;
    // console.log(this._mqttService.clientId)
    // if (!this.mqttSubscribed) {
    //   this.mqttSubscribed = true
    // if (localStorage.getItem('user') !== null) {
    // console.log(this.getDeviceId())
    this._mqttService.observables = {}
    this._mqttService.observe(this.sharedService.getUserByLS()['townId']).subscribe((message: IMqttMessage) => {
      // that.cubeData.next(JSON.parse(message.payload.toString()))
      let notice = JSON.parse(message.payload.toString())
      // this.notices = noticesTown.slice()
      // notice['seen'] = false
      this.notices.unshift(notice)
      console.log(JSON.parse(message.payload.toString()))
    });
    // }
  }

  navigateToDestination(destination: String) {
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // getContactDetails(notice) {
  //   return JSON.parse(notice?.customer?.appUser.contactDetails)
  // }

  // @ViewChild(ImageViewerComponent) imgViewer;

  // viewImg(file) {
  //   this.imgViewer.viewImg(file)
  // }

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll(event) {
  //   this.pharmacyDashboardService.viewNotice.next(0)
  // }

  getDivPositions(event) {
    console.log(event);
  }
}
