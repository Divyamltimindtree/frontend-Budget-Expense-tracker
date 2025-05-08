import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


export const routes: Routes = [
    {path:'',component:HomeComponent },
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    { path: 'dashboard', component: DashboardComponent },
    
  
];
