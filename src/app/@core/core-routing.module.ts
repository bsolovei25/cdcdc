// Angular
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NgModule } from '@angular/core';
// Local modules

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthenticationGuard],
        children: [
            // {
            //     path: 'dashboard',
            //     loadChildren: () =>
            //         import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
            //     // canLoad: [AuthenticationGuard],
            //     canActivate: [AuthenticationGuard],
            //     canActivateChild: [AuthenticationGuard],
            //     data: { animation: 'dashboard' },
            //     runGuardsAndResolvers: 'always',
            // },
            // {
            //     path: 'login',
            //     component: LoginComponent,
            //     data: { animation: 'login' },
            // },
            // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dev',
                loadChildren: () =>
                    import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            { path: '**', redirectTo: 'dev', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })],
    exports: [RouterModule],
})
export class CoreRoutingModule {}
// export const CoreRoutingModule = RouterModule.forRoot(routes);
