import { Routes } from '@angular/router';
import { WelcomeComponent } from './Pages/welcome/welcome.component';
import { RegisterPharmacyComponent } from './Pages/register-pharmacy/register-pharmacy.component';
import { RegisterDeliveryPersonComponent } from './Pages/register-delivery-person/register-delivery-person.component';


export const routes: Routes = [
    {path:"",component:WelcomeComponent},
    {path:"registerpharmacy",component:RegisterPharmacyComponent},
    {path:"registerdeliveryperson",component:RegisterDeliveryPersonComponent}
];
