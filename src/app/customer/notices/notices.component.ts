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
  selector: 'app-notices',
  // standalone: true,
  // imports: [CommonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatChipsModule],
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  private subscription: Subscription;
  iscreatenoticeshow: Boolean = true;
  notices = []

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

  getContactDetails(notice) {
    return JSON.parse(notice?.customer?.appUser.contactDetails)
  }

  @ViewChild(ImageViewerComponent) imgViewer;

  viewImg(file) {
    this.imgViewer.viewImg(file)
  }
}
