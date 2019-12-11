import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            }]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './admin/dashboard/admin-dashboard.module#AdminDashboardModule'
            }]
    },
    // {
    //   path: '**',
    //   redirectTo: 'error/404'
    // }
];
