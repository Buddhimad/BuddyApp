import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedService } from '../../common/shared-service.service';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {DateAgoPipe} from './../../Pipes/date-ago.pipe'
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
    providers: [DateAgoPipe],
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, MatMenuModule, DateAgoPipe]
})
export class NavBarComponent{
  public href: string = "";
  constructor(private sharedService: SharedService,private router:Router) {
    // intl.strings = englishStrings;
    // intl.changes.next();
  }


  openDrawer(): void {
  //  this.sharedService.callSharedFunction();
  // this.href = this.router.url;
  // console.log(this.router.url);
    this.sharedService.callOpenSideNavFunction('/sp/pharmacy/dashboard');
  }

  changeRoutes(url:any):void{
    this.sharedService.callChangeRouteFunction(url);
  }



  notification_list=[
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"pharmacy"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"delivery"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"pharmacy"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"pharmacy"
    },   {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"delivery"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"delivery"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"pharmacy"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"pharmacy"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"delivery"
    },
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:false,
      response_id:"001",
      notice_id:"0023",
      notice_type:"delivery"
    }
  ]
}
