import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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

  receivedMsgs = true
  respondedMsgs = true

  noticeObj

  notices = []

  todayNoticesCount = {
    messages: 0,
    responses: 0
  }
  allNoticesCount = {
    messages: 0,
    responses: 0
  }

  constructor(private router: Router, private sharedService: SharedService, private http: HttpClient,
              private _formBuilder: FormBuilder, private _mqttService: MqttService, private datePipe: DatePipe) {
    this.subscribeMqttTopic()
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route:any)=>{
    //   console.log(route);
    //   this.navigateToDestination(route);
    // })
  }

  searchedNotices = true

  ngOnInit(): void {
    this.filterNotices(0)
    this.respFormGroup = this._formBuilder.group({
      availability: [true],
      price: [''],
      responseTxt: [''],
      time: ['']
    });
  }

  noticesMain

  getNoticesPharmacy() {
    // if (this.searchedNotices) {
    let data = {
      pharmacyId: this.sharedService.getUserIdByLS(),
      townId: this.sharedService.getUserByLS().townId,
      startDate: this.datePipe.transform(this.startDate, "yyyy-MM-dd"),
      endDate: this.datePipe.transform(this.endDate, "yyyy-MM-dd"),
    }
    console.log(data)
    this.http.post<any>(this.sharedService.publicUrl + 'notice/get_notices_pharmacy', data).subscribe((notices) => {
      this.noticesMain = notices
      this.setHeadersAndMsgs(0)
    })
    // }
  }

  noticeSection = 0

  filterNotices(val) {
    if (val === 0) {
      this.noticeSection = val
      let date = new Date();
      this.startDate = date
      this.endDate = date
      this.range.controls['startDate'].setValue(this.startDate)
      this.range.controls['endDate'].setValue(this.endDate)
      this.notices = this.noticesMain?.dateNotices
      if (this.searchedNotices) {
        this.getNoticesPharmacy()
        this.searchedNotices = false
      }
    } else if (val === 1) {
      this.noticeSection = val
      this.startDate = null
      this.endDate = null
      this.notices = this.noticesMain?.allNotices
    } else if (val === 2) {
      this.searchedNotices = true
      this.startDate = this.range.controls['startDate'].value
      this.endDate = this.range.controls['endDate'].value
      // this.todayNoticesCount.messages = 0
      // this.todayNoticesCount.responses = 0
      this.getNoticesPharmacy()
    } else if (val === 3) {
      this.searchedNotices = true
    }
    // console.log(this.range.controls['startDate'].value)
    // console.log(this.range.controls['endDate'].value)
  }

  subscribeMqttTopic(): void {
    let that = this;
    // console.log(this._mqttService.clientId)
    // if (!this.mqttSubscribed) {
    //   this.mqttSubscribed = true
    // if (localStorage.getItem('user') !== null) {
    // console.log(this.getDeviceId())
    this._mqttService.observables = {}
    this._mqttService.observe(this.sharedService.getUserByLS()['townId']).subscribe((message: IMqttMessage) => {
      let notice = JSON.parse(message.payload.toString())
      this.setHeadersAndMsgs(1, notice)
    });

    this._mqttService.observe(this.sharedService.getUserIdByLS()).subscribe((message: IMqttMessage) => {
      let notice = JSON.parse(message.payload.toString())
      console.log(notice)
      // let notice = this.noticesMain.allNotices.find(notice => {
      //   return notice.notice.id === noticeMsg.noticeId
      // })
      this.setHeadersAndMsgs(3, notice)
    });
    console.log(this._mqttService.observables)
    // }
  }

  funcViewNotice(noticeObj, view) {
    if (view) {
      // console.log(noticeObj)
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
            this.setHeadersAndMsgs(2, noticeObj)
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
          this.setHeadersAndMsgs(2, noticeObj)
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

  setHeadersAndMsgs(val, noticeObj?) {
    if (val === 0) { //set counts
      this.notices = this.noticesMain.dateNotices
      // console.log(notices)
      // this.todayNoticesCount.messages = notices.dateNotices.length
      // if (val === 1) {
      this.todayNoticesCount.messages = this.noticesMain.dateNotices.length
      this.todayNoticesCount.responses = 0
      for (let response of this.noticesMain.dateNotices) {
        if (response.responded) {
          this.todayNoticesCount.responses++;
        }
      }
      // }
      // this.allNoticesCount.messages = notices.allNotices.length
      this.allNoticesCount.messages = this.noticesMain.allNotices.length
      this.allNoticesCount.responses = 0
      for (let response of this.noticesMain.allNotices) {
        if (response.responded) {
          this.allNoticesCount.responses++;
        }
      }
    } else if (val === 1) { // mqtt
      this.noticesMain.dateNotices.unshift(noticeObj)
      this.noticesMain.allNotices.unshift(noticeObj)
      this.todayNoticesCount.messages = this.noticesMain.dateNotices.length
      this.allNoticesCount.messages = this.noticesMain.allNotices.length
    } else if (val === 2) { // responded
      if (this.noticeSection === 0) { // today
        let notice = this.noticesMain.allNotices.find(notice => {
          return notice.notice.id === noticeObj.notice.id
        })
        Object.assign(notice, noticeObj);
      } else if (this.noticeSection === 1) { // all
        let notice = this.noticesMain.dateNotices.find(notice => {
          return notice.notice.id === noticeObj.notice.id
        })
        Object.assign(notice, noticeObj);
      }

      this.todayNoticesCount.responses = 0
      for (let response of this.noticesMain.dateNotices) {
        if (response.responded) {
          this.todayNoticesCount.responses++;
        }
      }

      this.allNoticesCount.responses = 0
      for (let response of this.noticesMain.allNotices) {
        if (response.responded) {
          this.allNoticesCount.responses++;
        }
      }
    } else if (val === 3) { // responded
      let notice = this.noticesMain.allNotices.find(notice => {
        return notice.notice.id === noticeObj.noticeId
      })
      notice.responseRead = true
      notice = this.noticesMain.dateNotices.find(notice => {
        return notice.notice.id === noticeObj.noticeId
      })
      notice.responseRead = true
    }
  }

  viewRespondedAndReceivedMsgs(val) {
    if (val === 0) {
      if (this.receivedMsgs) {
        this.receivedMsgs = false
      } else {
        this.receivedMsgs = true
      }
      for (let notice of this.noticesMain.dateNotices) {
        if (!notice.responded) {
          notice.showMsg = this.receivedMsgs
        }
      }
      for (let notice of this.noticesMain.allNotices) {
        if (!notice.responded) {
          notice.showMsg = this.receivedMsgs
        }
      }
    } else if (val === 1) {
      if (this.respondedMsgs) {
        this.respondedMsgs = false
      } else {
        this.respondedMsgs = true
      }
      for (let notice of this.noticesMain.dateNotices) {
        if (notice.responded) {
          notice.showMsg = this.respondedMsgs
        }
      }
      for (let notice of this.noticesMain.allNotices) {
        if (notice.responded) {
          notice.showMsg = this.respondedMsgs
        }
      }
    }


  }

  navigateToDestination(destination: String) {
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  range = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  startDate
  endDate

  @ViewChild(ImageViewerComponent) imgViewer;

  viewImg(file) {
    this.imgViewer.viewImg(file)
  }

  getContactDetails(notice) {
    return JSON.parse(notice?.customer?.appUser.contactDetails)
  }

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

  // getDivPositions(event) {
  //   console.log(event);
  // }
}
