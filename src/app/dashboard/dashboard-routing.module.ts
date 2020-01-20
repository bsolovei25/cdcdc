// Angular
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// Local modules

export const DashboardRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
];

export const DashboardRoutingModule = RouterModule.forChild(DashboardRoutes);
