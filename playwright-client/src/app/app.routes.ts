import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { HeaderComponent } from './header-component/header-component';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent},
    {path: 'header', component: HeaderComponent},
    {
        path: 'common-layout', 
        component: CommonLayoutComponent,
        children:[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {path: 'dashboard', component: DashboardComponent},
            {path: 'test-cases', component: TestCasesComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'reports', component: ReportsComponent},      
        ]
    },    
];
