// Angular
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevGraphComponent } from './pages/dev-graph/dev-graph.component';
import { NgModule } from '@angular/core';
// Local modules

export const DashboardRoutes: Routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    // },
    {
        path: '',
        component: DevGraphComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(DashboardRoutes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
// export const DashboardRoutingModule = RouterModule.forChild(DashboardRoutes);
