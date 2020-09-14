import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitsChartComponent } from './components/limits-chart/limits-chart.component';
import { DeviationLimitsChartComponent } from './components/deviation-limits-chart/deviation-limits-chart.component';

@NgModule({
    declarations: [LimitsChartComponent, DeviationLimitsChartComponent],
    imports: [CommonModule],
    exports: [LimitsChartComponent, DeviationLimitsChartComponent],
})
export class AstueOnpzSharedModule {}
