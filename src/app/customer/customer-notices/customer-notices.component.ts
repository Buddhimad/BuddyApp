import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SharedService} from '../../common/shared-service.service';
import {ImageViewerComponent} from "../../common/image-viewer/image-viewer.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer-notices',
  // standalone: true,
  // imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatChipsModule],
  templateUrl: './customer-notices.component.html',
  styleUrls: ['./customer-notices.component.css']
})
export class CustomerNoticesComponent implements OnInit {
  private subscription: Subscription;
  iscreatenoticeshow: Boolean = true;
  notices = []

  viewNotice = false
  noticeObj

  // localStorage = this.document.defaultView?.localStorage;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router, private sharedService: SharedService, private http: HttpClient) {
    // this.subscription = this.sharedService.routeControlSubject.subscribe((route: any) => {
    //   this.navigateToDestination(route);
    // })
  }

  ngOnInit() {
    this.getNoticesCustomer()
  }

  navigateToDestination(destination: String) {
    // if (destination == "/customer/createnotice") {
    //   this.iscreatenoticeshow = false;
    // } else {
    //   this.iscreatenoticeshow = true;
    // }
    // this.router.navigate([destination]);
    this.sharedService.callChangeRouteFunction(destination)
  }

  getNoticesCustomer() {
    // console.log(44)
    this.http.get<any>(this.sharedService.publicUrl + 'notice/get_notices_customer/' + this.sharedService.getUserIdByLS()).subscribe((notices: []) => {
      this.notices = notices
      console.log(notices)
      // for (let notice of notices) {
      //   // notices.forEach(notice => {
      //   this.notices.push(notice)
      // }
    })
  }

  readResponses(noticeObj) {
    // console.log(noticeObj)
    if (noticeObj?.notice?.responses.length > 0 && !noticeObj?.seen) {
      // console.log(2)
      let c_notice = {
        notice: {
          id: noticeObj?.notice?.id
        }
      };

      this.http.post(this.sharedService.publicUrl + 'notice/msg_read_customer', c_notice).subscribe((response) => {
        if (response) {
          // noticeObj.response = response
          noticeObj.seen = true
          // noticeObj.responseRead = true
          // this.setHeadersAndMsgs(2, noticeObj)
          // console.log(noticeObj)
        }
      }, (error) => {
        console.log(error)
        //   // this.success = 2;
      })
    }
  }

  funcViewNotice(noticeObj, view) {
    if (view) {
      // console.log(noticeObj)
      this.noticeObj = noticeObj;
      this.viewNotice = true
    } else {
      this.viewNotice = false
    }
  }

  getContactDetails(notice) {
    return JSON.parse(notice?.customer?.appUser.contactDetails)
  }

  @ViewChild(ImageViewerComponent) imgViewer;

  viewImg(file) {
    this.imgViewer.viewImg(file)
  }
}
