import { Routes } from '@angular/router';
import { WelcomeComponent } from './Pages/welcome/welcome.component';
import { RegisterPharmacyComponent } from './Pages/register-pharmacy/register-pharmacy.component';
import { RegisterDeliveryPersonComponent } from './Pages/register-delivery-person/register-delivery-person.component';
import { RegisterCustomerComponent } from './Pages/register-customer/register-customer.component';
import { CustomerDashboardComponent } from './Pages/customer-dashboard/customer-dashboard.component';
import { NoticesComponent } from './Components/notices/notices.component';
import { CreateNoticeComponent } from './Components/create-notice/create-notice.component';
import { ShopProfileComponent } from './Components/shop-profile/shop-profile.component';
import { CustomerAccountComponent } from './Components/customer-account/customer-account.component';
import { VeryfyCustomerComponent } from './Components/veryfy-customer/veryfy-customer.component';
import { NotificationPanelComponent } from './Components/notification-panel/notification-panel.component';
import { SecurityComponent } from './Components/security/security.component';
import { ServiceProviderIndexComponent } from './Pages/service-provider-index/service-provider-index.component';
import { PharmacyDashboardComponent } from './Pages/pharmacy-dashboard/pharmacy-dashboard.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'registerpharmacy', component: RegisterPharmacyComponent },
  {
    path: 'registerdeliveryperson',
    component: RegisterDeliveryPersonComponent,
  },
  { path: 'registercustomer', component: RegisterCustomerComponent },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    children: [
      {
        path: '',
        component: NoticesComponent,
      },
      {
        path:'pharmacynotices',
        component:NoticesComponent
      },
      {
        path:'deliverynotices',
        component:NoticesComponent
      },
      {
        path:'createnotice',
        component:CreateNoticeComponent
      },
      {
        path:'shopname/profile',
        component:ShopProfileComponent
      },
      {
        path:'account',
        component:CustomerAccountComponent
      },
      {
        path:'verify/account',
        component:VeryfyCustomerComponent
      },
      {
        path:'notifications',
        component:NotificationPanelComponent
      },
      {
        path:'security',
        component:SecurityComponent
      }
    ],
  },
  {
    path:'sp',
    component:ServiceProviderIndexComponent,
    children:[
      {
        path:'pharmacy',
        children:[
          {
            path:'dashboard',
            component:PharmacyDashboardComponent
          },
          {
            path:'notifications',
            component:NotificationPanelComponent
          }
        ]
      }
    ]
  }
];
