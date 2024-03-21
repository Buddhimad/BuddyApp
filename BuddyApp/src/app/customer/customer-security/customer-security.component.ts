import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedService} from "../../common/shared-service.service";
import {HttpClient} from "@angular/common/http";
import {PasswordConfirm} from "../../validations/chk-password";
import {PasswordResetComponent} from "../../common/password-reset/password-reset.component";

@Component({
  selector: 'app-customer-security',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, PasswordResetComponent],
  templateUrl: './customer-security.component.html',
  styleUrl: './customer-security.component.css'
})
export class CustomerSecurityComponent implements OnInit {

  user;

  constructor(private sharedService: SharedService, private _formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user = this.sharedService.getUserByLS()
  }

}
