import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTable, MatTableModule } from '@angular/material/table';
import {AccountInfoComponent} from "../../common/account-info/account-info.component";

@Component({
  selector: 'app-pharmacy-account',
  standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        AccountInfoComponent,
    ],
  templateUrl: './pharmacy-account.component.html',
  styleUrl: './pharmacy-account.component.css',
})
export class PharmacyAccountComponent {
  isEditClick: Boolean = false;

  openTimes = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];
  closeTimes = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];
  weekdays = [
    {
      name: 'Sunday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
    {
      name: 'Monday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
    {
      name: 'Tuesday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
    {
      name: 'Wednesday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
    {
      name: 'Thursday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
    {
      name: 'Friday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
    {
      name: 'Saturday',
      is_open: true,
      open_time: '',
      close_time: '',
    },
  ];

  showEdit() {
    if (this.isEditClick) {
      this.isEditClick = false;
    } else {
      this.isEditClick = true;
    }
  }
}
