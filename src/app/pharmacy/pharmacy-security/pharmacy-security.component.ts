import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedService} from "../../common/shared-service.service";
import {HttpClient} from "@angular/common/http";
import {PasswordConfirm} from "../../validations/chk-password";
import {PasswordResetComponent} from "../../common/password-reset/password-reset.component";

@Component({
  selector: 'app-service-provider-account-security',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule, PasswordResetComponent],
  templateUrl: './pharmacy-security.component.html',
  styleUrl: './pharmacy-security.component.css'
})
export class PharmacySecurityComponent implements OnInit {

  user;

  constructor(private sharedService: SharedService, private _formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user = this.sharedService.getUserByLS()
  }
}
