import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdMatBalanceComponent } from './cd-mat-balance.component';
import { CdMatBalanceChartComponent } from './components/cd-mat-balance-chart/cd-mat-balance-chart.component';
import { CdMatBalanceGaugeComponent } from './components/cd-mat-balance-gauge/cd-mat-balance-gauge.component';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { CDSharedModule } from '../cd-shared/cd-shared.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CdMatBalanceComponent, CdMatBalanceChartComponent, CdMatBalanceGaugeComponent],
    imports: [
        CommonModule,
        DashboardModule,
        CDSharedModule,
        SharedModule
    ]
})
export class CdMatBalanceModule {
    enterComponent = CdMatBalanceComponent;
}
