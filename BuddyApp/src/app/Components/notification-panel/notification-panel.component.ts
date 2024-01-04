import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Notification } from './../../Interfaces/notification';
import {DateAgoPipe} from './../../Pipes/date-ago.pipe'
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,DateAgoPipe,MatIconModule],
  templateUrl: './notification-panel.component.html',
  styleUrl: './notification-panel.component.css'
})
export class NotificationPanelComponent {

  notification_list:Notification[]=[
    {
      responders_name:"Loyde Pharmacy",
      message:"Loyde Pharmacy respond to your notice",
      profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rPhdX55QM8uvY_AZtuQv2DduypN2ayeYjA&usqp=CAU",
      time_stamp:new Date(),
      is_seen:true,
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
