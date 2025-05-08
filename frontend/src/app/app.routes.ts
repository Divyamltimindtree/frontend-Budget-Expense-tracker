import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { IncomeComponent } from './component/income/income.component';

export const routes: Routes = [
    {path:'',component:HomeComponent },
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    
    { path: 'dashboard', component: DashboardComponent },
    { path: 'expenses', component: ExpenseComponent },
    { path: 'income', component: IncomeComponent }
];
