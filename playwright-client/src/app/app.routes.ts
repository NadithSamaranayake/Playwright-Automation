import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { HeaderComponent } from './header-component/header-component';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent},
    {path: 'header', component: HeaderComponent}
];
