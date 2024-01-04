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
      }
    ],
  }
];
