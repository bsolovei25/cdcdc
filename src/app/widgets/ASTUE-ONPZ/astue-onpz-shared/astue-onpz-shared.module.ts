import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitsChartComponent } from './components/limits-chart/limits-chart.component';
import { DeviationLimitsChartComponent } from './components/deviation-limits-chart/deviation-limits-chart.component';
import { PlanningChartComponent } from './components/planning-chart/planning-chart.component';

@NgModule({
    declarations: [LimitsChartComponent, DeviationLimitsChartComponent, PlanningChartComponent],
    imports: [CommonModule],
    exports: [LimitsChartComponent, DeviationLimitsChartComponent, PlanningChartComponent],
})
export class AstueOnpzSharedModule {}
