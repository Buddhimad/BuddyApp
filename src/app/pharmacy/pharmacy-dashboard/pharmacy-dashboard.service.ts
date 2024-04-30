import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {SharedService} from "../../common/shared-service.service";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PharmacyDashboardService {

  newMessagesSubscribe = new Subject()

  noticesMain
  notices = []

  todayNoticesCount = {
    messages: 0,
    responses: 0
  }
  allNoticesCount = {
    messages: 0,
    responses: 0
  }

  noticeSection = 0

  isInDashboard = false

  constructor(private _mqttService: MqttService, private sharedService: SharedService, private http: HttpClient, private datePipe: DatePipe,) {
    this.subscribeMqttTopic()
    // if (!this.isInDashboard) {
      let date = new Date()
      this.getNoticesPharmacy(date, date)
    // }
  }

  getNoticesPharmacy(startDate, endDate) {
    // if (this.searchedNotices) {
    let data = {
      pharmacyId: this.sharedService.getUserIdByLS(),
      townId: this.sharedService.getUserByLS().townId,
      startDate: this.datePipe.transform(startDate, "yyyy-MM-dd"),
      endDate: this.datePipe.transform(endDate, "yyyy-MM-dd"),
    }
    // console.log(data)
    // if (this.pdService.preState.noticesMain === undefined) {
    this.http.post<any>(this.sharedService.publicUrl + 'notice/get_notices_pharmacy', data).subscribe((notices) => {
      this.noticesMain = notices
      // console.log(this.noticesMain)
      this.setHeadersAndMsgs(0)
    })
    // } else {
    //   this.noticesMain = this.pdService.preState.noticesMain
    //   this.setHeadersAndMsgs(0)
    // }
    // }
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
      // console.log(notice)
      // let notice = this.noticesMain.allNotices.find(notice => {
      //   return notice.notice.id === noticeMsg.noticeId
      // })
      this.setHeadersAndMsgs(3, notice)
    });
    // console.log(this._mqttService.observables)
    // }
  }

  setHeadersAndMsgs(val, noticeObj?) {
    if (val === 0) { //set counts
      this.notices = this.noticesMain.dateNotices
      // console.log(notices)
      // this.todayNoticesCount.messages = notices.dateNotices.length
      // if (val === 1) {
      this.todayNoticesCount.messages = this.noticesMain?.dateNotices?.length
      this.todayNoticesCount.responses = 0
      if (this.noticesMain?.dateNotices !== undefined) {
        for (let response of this.noticesMain?.dateNotices) {
          if (response.responded) {
            this.todayNoticesCount.responses++;
          }
        }
      }
      // }
      // this.allNoticesCount.messages = notices.allNotices.length
      this.allNoticesCount.messages = this.noticesMain?.allNotices?.length
      this.allNoticesCount.responses = 0
      if (this.noticesMain?.allNotices !== undefined) {
        for (let response of this.noticesMain.allNotices) {
          if (response.responded) {
            this.allNoticesCount.responses++;
          }
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
    this.setNewNoticesNotify()
  }

  setNewNoticesNotify() {
    this.newMessagesSubscribe.next(
      this.noticesMain.allNotices.filter(notice => {
        return !notice?.seen
      })
    )
    // this.notices = this.noticesMain.dateNotices
  }

}
