import { Routes } from '@angular/router';
import { WelcomeComponent } from './Pages/welcome/welcome.component';
import { RegisterPharmacyComponent } from './Pages/register-pharmacy/register-pharmacy.component';


export const routes: Routes = [
    {path:"",component:WelcomeComponent},
    {path:"registerpharmacy",component:RegisterPharmacyComponent}
];
