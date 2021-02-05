import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolarChartComponent } from './polar-chart.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardModule } from '../../../dashboard/dashboard.module';

@NgModule({
    declarations: [PolarChartComponent],
    imports: [CommonModule, SharedModule, DashboardModule],
})
export class PolarChartModule {
    enterComponent = PolarChartComponent;
}
