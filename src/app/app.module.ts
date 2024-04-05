import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountInfoComponent} from "./common/account-info/account-info.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule, MatOptionModule, MatRippleModule, NativeDateAdapter} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateAgoPipe} from "./pipes/date-ago.pipe";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import {NavBarComponent} from "./common/nav-bar/nav-bar.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatExpansionModule} from "@angular/material/expansion";
import {PasswordResetComponent} from "./common/password-reset/password-reset.component";
import {WelcomeComponent} from "./common/welcome/welcome.component";
// import {MatFileUploadModule} from "angular-material-fileupload";
import {CreateNoticeComponent} from "./customer/create-notice/create-notice.component";
import {MatStepperModule} from "@angular/material/stepper";
import {CustomerAccountComponent} from "./customer/customer-account/customer-account.component";
import {CustomerDashboardComponent} from "./customer/customer-dashboard/customer-dashboard.component";
import {CustomerSecurityComponent} from "./customer/customer-security/customer-security.component";
import {CustomerSideNavComponent} from "./customer/customer-side-nav/customer-side-nav.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NoticesComponent} from "./customer/notices/notices.component";
import {RegisterCustomerComponent} from "./customer/register-customer/register-customer.component";
import {VeryfyCustomerComponent} from "./customer/veryfy-customer/veryfy-customer.component";
import {MatTableModule} from "@angular/material/table";
import {PharmacyAccountComponent} from "./pharmacy/pharmacy-account/pharmacy-account.component";
import {PharmacyBillingInfoComponent} from "./pharmacy/pharmacy-billing-info/pharmacy-billing-info.component";
import {PharmacyDashboardComponent} from "./pharmacy/pharmacy-dashboard/pharmacy-dashboard.component";
import {PharmacyResponseViewComponent} from "./pharmacy/pharmacy-response-view/pharmacy-response-view.component";
import {PharmacySecurityComponent} from "./pharmacy/pharmacy-security/pharmacy-security.component";
import {RegisterPharmacyComponent} from "./pharmacy/register-pharmacy/register-pharmacy.component";
import {MatDividerModule} from "@angular/material/divider";
import {SPSideNavComponent} from "./pharmacy/sp-side-nav/sp-side-nav.component";
import {VerifyPharmacyAccountComponent} from "./pharmacy/verify-pharmacy-account/verify-pharmacy-account.component";
import {PharmacyMainComponent} from "./pharmacy/pharmacy-main/pharmacy-main.component";
import {CustomerProfileComponent} from "./customer/customer-profile/customer-profile.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import { BuddyFileUploadComponent } from './common/buddy-file-upload/buddy-file-upload.component';
import { ProfileHeaderComponent } from './common/profile-header/profile-header.component';
import { ImageViewerComponent } from './common/image-viewer/image-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountInfoComponent,
    NavBarComponent,
    PasswordResetComponent,
    WelcomeComponent,
    CreateNoticeComponent,
    CustomerAccountComponent,
    CustomerDashboardComponent,
    CustomerSecurityComponent,
    CustomerSideNavComponent,
    NoticesComponent,
    RegisterCustomerComponent,
    VeryfyCustomerComponent,
    CustomerProfileComponent,
    PharmacyAccountComponent,
    PharmacyBillingInfoComponent,
    PharmacyDashboardComponent,
    PharmacyResponseViewComponent,
    PharmacySecurityComponent,
    RegisterPharmacyComponent,
    SPSideNavComponent,
    VerifyPharmacyAccountComponent,
    PharmacyMainComponent,
    DateAgoPipe,
    BuddyFileUploadComponent,
    ProfileHeaderComponent,
    ImageViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule, FormsModule, HttpClientModule, BrowserAnimationsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule,
    MatToolbarModule, MatIconModule, MatBadgeModule, MatMenuModule,
    MatDatepickerModule, MatExpansionModule, MatNativeDateModule, MatStepperModule,
    MatTooltipModule, MatChipsModule, MatTableModule,
    MatDividerModule, MatRippleModule, NgxMaterialTimepickerModule, MatSidenavModule, MatListModule
  ],
  // exports:[
  //   MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule,
  //   MatToolbarModule, MatIconModule, MatBadgeModule, MatMenuModule,
  //   MatDatepickerModule, MatExpansionModule, MatNativeDateModule, MatFileUploadModule, MatStepperModule,
  //   MatTooltipModule, MatChipsModule, MatTableModule,
  //   MatDividerModule, MatRippleModule,
  // ],
  providers: [DateAgoPipe, NativeDateAdapter],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
