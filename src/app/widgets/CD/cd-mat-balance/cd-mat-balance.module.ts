import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdMatBalanceComponent } from './cd-mat-balance.component';
import { CdMatBalanceChartComponent } from './components/cd-mat-balance-chart/cd-mat-balance-chart.component';
import { CdMatBalanceGaugeComponent } from './components/cd-mat-balance-gauge/cd-mat-balance-gauge.component';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { CDSharedModule } from '../cd-shared/cd-shared.module';
import { SharedModule } from '@shared/shared.module';
import { CdMatBalanceRightComponent } from './components/cd-mat-balance-right/cd-mat-balance-right.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [CdMatBalanceComponent, CdMatBalanceChartComponent, CdMatBalanceGaugeComponent, CdMatBalanceRightComponent],
    imports: [
        CommonModule,
        DashboardModule,
        CDSharedModule,
        SharedModule,
        MatSelectModule,
        MatFormFieldModule,
        AngularSvgIconModule,
    ]
})
export class CdMatBalanceModule {
    enterComponent = CdMatBalanceComponent;
}
