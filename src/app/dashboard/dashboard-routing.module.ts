// Angular
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevGraphComponent } from './pages/dev-graph/dev-graph.component';
// Local modules

export const DashboardRoutes: Routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    // },
    {
        path: '',
        component: DevGraphComponent,
    }
];

export const DashboardRoutingModule = RouterModule.forChild(DashboardRoutes);
