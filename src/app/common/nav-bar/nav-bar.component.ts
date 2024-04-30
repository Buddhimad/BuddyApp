import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared-service.service';
import {Router} from '@angular/router';
import {PharmacyDashboardService} from "../../pharmacy/pharmacy-dashboard/pharmacy-dashboard.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css',]
})
export class NavBarComponent {
  public href: string = "";

  constructor(private sharedService: SharedService, private router: Router, private pdService: PharmacyDashboardService) {
    pdService.newMessagesSubscribe.subscribe((messages: any) => {
      console.log(messages)
      // this.notification_list = messages
      for (let message of messages) {
        // console.log(message)
        this.notification_list.push({
          responders_name: message.notice.customer.appUser.fullName,
          message: message.notice.customer.appUser.fullName,
          is_seen: false,
        //   response_id: "001",
        //   notice_id: "0023",
        //   notice_type: "pharmacy"
        })
      }
    })
    // intl.strings = englishStrings;
    // intl.changes.next();
  }


  openDrawer(): void {
    //  this.sharedService.callSharedFunction();
    // this.href = this.router.url;
    // console.log(this.router.url);
    this.sharedService.callOpenSideNavFunction('switch');
  }

  changeRoutes(url: any): void {
    this.sharedService.callChangeRouteFunction(url);
  }

  logout() {
    try {
      localStorage.clear()
    } catch (e) {
      // console.log(e);
    }
    this.router.navigate([''])
  }

  notification_list = [
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "pharmacy"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "delivery"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "pharmacy"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "pharmacy"
    // }, {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "delivery"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "delivery"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "pharmacy"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "pharmacy"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "delivery"
    // },
    // {
    //   responders_name: "Loyde Pharmacy",
    //   message: "Loyde Pharmacy respond to your notice",
    //   profile_pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
    //   time_stamp: new Date(),
    //   is_seen: false,
    //   response_id: "001",
    //   notice_id: "0023",
    //   notice_type: "delivery"
    // }
  ]
}
