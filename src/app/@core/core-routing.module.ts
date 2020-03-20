// Angular
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
// Local modules

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
                canLoad: [AuthenticationGuard],
                canActivate: [AuthenticationGuard],
                canActivateChild: [AuthenticationGuard],
                data: { animation: 'dashboard' },
            },
            {
                path: 'login',
                component: LoginComponent,
                data: { animation: 'login' },
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
    },
];

export const CoreRoutingModule = RouterModule.forRoot(routes);
