import {Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {RegisterPharmacyComponent} from './pharmacy/register-pharmacy/register-pharmacy.component';
import {RegisterDeliveryPersonComponent} from './Pages/register-delivery-person/register-delivery-person.component';
import {RegisterCustomerComponent} from './customer/register-customer/register-customer.component';
import {CustomerDashboardComponent} from './customer/customer-dashboard/customer-dashboard.component';
import {NoticesComponent} from './customer/notices/notices.component';
import {CreateNoticeComponent} from './customer/create-notice/create-notice.component';
import {ShopProfileComponent} from './Components/shop-profile/shop-profile.component';
import {CustomerAccountComponent} from './customer/customer-account/customer-account.component';
import {VeryfyCustomerComponent} from './customer/veryfy-customer/veryfy-customer.component';
import {NotificationPanelComponent} from './Components/notification-panel/notification-panel.component';
import {PasswordResetComponent} from './common/password-reset/password-reset.component';
import {ServiceProviderIndexComponent} from './Pages/service-provider-index/service-provider-index.component';
import {PharmacyDashboardComponent} from './pharmacy/pharmacy-dashboard/pharmacy-dashboard.component';
import {PharmacyResponseViewComponent} from './pharmacy/pharmacy-response-view/pharmacy-response-view.component';
import {CustomerProfileComponent} from './customer/customer-profile/customer-profile.component';
import {PharmacyAccountComponent} from './pharmacy/pharmacy-account/pharmacy-account.component';
import {
  PharmacySecurityComponent
} from './pharmacy/pharmacy-security/pharmacy-security.component';
import {VerifyPharmacyAccountComponent} from './pharmacy/verify-pharmacy-account/verify-pharmacy-account.component';
import {PharmacyBillingInfoComponent} from './pharmacy/pharmacy-billing-info/pharmacy-billing-info.component';
import {CustomerSecurityComponent} from "./customer/customer-security/customer-security.component";

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'registerpharmacy', component: RegisterPharmacyComponent},
  {
    path: 'registerdeliveryperson',
    component: RegisterDeliveryPersonComponent,
  },
  {path: 'registercustomer', component: RegisterCustomerComponent},
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: NoticesComponent,
      },
      {
        path: 'pharmacynotices',
        component: NoticesComponent
      },
      {
        path: 'deliverynotices',
        component: NoticesComponent
      },
      {
        path: 'createnotice',
        component: CreateNoticeComponent
      },
      {
        path: 'shopname/profile',
        component: ShopProfileComponent
      },
      {
        path: 'account',
        component: CustomerAccountComponent
      },
      {
        path: 'verify/account',
        component: VeryfyCustomerComponent
      },
      {
        path: 'notifications',
        component: NotificationPanelComponent
      },
      {
        path: 'security',
        component: CustomerSecurityComponent
      }
    ],
  },
  {
    path: 'pharmacy',
    component: ServiceProviderIndexComponent,
    children: [
      {
        path: 'dashboard',
        component: PharmacyDashboardComponent
      },
      {
        path: 'respond',
        component: PharmacyResponseViewComponent
      },
      {
        path: 'notifications',
        component: NotificationPanelComponent
      },
      {
        path: 'customername/profile',
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
