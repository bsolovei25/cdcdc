import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionTrendComponent } from './production-trend.component';
import { FacilityComponent } from './components/facility/facility.component';
import { SharedModule } from '@shared/shared.module';
import { MainIconComponent } from './components/main-icon/main-icon.component';
import { ProductionTrendCardInfoComponent } from './components/production-trend-card-info/production-trend-card-info.component';
import { ProductionTrendFacilitiesComponent } from './components/production-trend-facilities/production-trend-facilities.component';
import { ProductionTrendGraphComponent } from './components/production-trend-graph/production-trend-graph.component';
import { ProductionTrendInstallationsComponent } from './components/production-trend-installations/production-trend-installations.component';
import { ProductionTrendPanelComponent } from './components/production-trend-panel/production-trend-panel.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';

@NgModule({
    declarations: [
        ProductionTrendComponent,
        FacilityComponent,
        MainIconComponent,
        ProductionTrendCardInfoComponent,
        ProductionTrendFacilitiesComponent,
        ProductionTrendGraphComponent,
        ProductionTrendInstallationsComponent,
        ProductionTrendPanelComponent,
    ],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, DashboardModule],
})
export class ProductionTrendModule {
    enterComponent = ProductionTrendComponent;
}
