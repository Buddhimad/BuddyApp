import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PharmacyBillingInfoComponent} from "./pharmacy/pharmacy-billing-info/pharmacy-billing-info.component";
import {VerifyPharmacyAccountComponent} from "./pharmacy/verify-pharmacy-account/verify-pharmacy-account.component";
import {PharmacySecurityComponent} from "./pharmacy/pharmacy-security/pharmacy-security.component";
import {PharmacyAccountComponent} from "./pharmacy/pharmacy-account/pharmacy-account.component";
import {CustomerProfileComponent} from "./customer/customer-profile/customer-profile.component";
import {PharmacyDashboardComponent} from "./pharmacy/pharmacy-dashboard/pharmacy-dashboard.component";
import {PharmacyResponseViewComponent} from "./pharmacy/pharmacy-response-view/pharmacy-response-view.component";
import {CustomerSecurityComponent} from "./customer/customer-security/customer-security.component";
import {VeryfyCustomerComponent} from "./customer/veryfy-customer/veryfy-customer.component";
import {CustomerAccountComponent} from "./customer/customer-account/customer-account.component";
import {CreateNoticeComponent} from "./customer/create-notice/create-notice.component";
import {CustomerNoticesComponent} from "./customer/customer-notices/customer-notices.component";
import {CustomerDashboardComponent} from "./customer/customer-dashboard/customer-dashboard.component";
import {RegisterCustomerComponent} from "./customer/register-customer/register-customer.component";
import {RegisterPharmacyComponent} from "./pharmacy/register-pharmacy/register-pharmacy.component";
import {WelcomeComponent} from "./common/welcome/welcome.component";
import {PharmacyMainComponent} from "./pharmacy/pharmacy-main/pharmacy-main.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'registerpharmacy', component: RegisterPharmacyComponent},
  // {
  //   path: 'registerdeliveryperson',
  //   component: RegisterDeliveryPersonComponent,
  // },
  {path: 'registercustomer', component: RegisterCustomerComponent},
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: CustomerNoticesComponent,
      },
      {
        path: 'pharmacynotices',
        component: CustomerNoticesComponent
      },
      {
        path: 'deliverynotices',
        component: CustomerNoticesComponent
      },
      {
        path: 'createnotice',
        component: CreateNoticeComponent
      },
      // {
      //   path: 'shopname/profile',
      //   component: ShopProfileComponent
      // },
      {
        path: 'account',
        component: CustomerAccountComponent
      },
      {
        path: 'verify/account',
        component: VeryfyCustomerComponent
      },
      // {
      //   path: 'notifications',
      //   component: NotificationPanelComponent
      // },
      {
        path: 'security',
        component: CustomerSecurityComponent
      }
    ],
  },
  {
    path: 'pharmacy',
    component: PharmacyMainComponent,
    children: [
      {
        path: 'dashboard',
        component: PharmacyDashboardComponent
      },
      {
        path: 'respond',
        component: PharmacyResponseViewComponent
      },
      // {
      //   path: 'notifications',
      //   component: NotificationPanelComponent
      // },
      {
        path: 'customer/profile',
        component: CustomerProfileComponent
      },
      {
        path: 'account',
        component: PharmacyAccountComponent
      },
      {
        path: 'security',
        component: PharmacySecurityComponent
      },
      {
        path: 'verify',
        component: VerifyPharmacyAccountComponent
      },
      {
        path: 'billing',
        component: PharmacyBillingInfoComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
