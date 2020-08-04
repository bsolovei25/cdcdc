import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdMatBalanceComponent } from './cd-mat-balance.component';
import { CdMatBalanceChartComponent } from './components/cd-mat-balance-chart/cd-mat-balance-chart.component';
import { CdMatBalanceGaugeComponent } from './components/cd-mat-balance-gauge/cd-mat-balance-gauge.component';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { CdLineChartComponent } from '../shared/cd-line-chart/cd-line-chart.component';

@NgModule({
    declarations: [CdMatBalanceComponent, CdMatBalanceChartComponent, CdMatBalanceGaugeComponent, CdLineChartComponent],
    imports: [
        CommonModule,
        DashboardModule
    ]
})
export class CdMatBalanceModule {
    enterComponent = CdMatBalanceComponent;
}
