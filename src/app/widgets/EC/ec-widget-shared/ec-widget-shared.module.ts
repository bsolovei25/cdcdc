import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitsChartComponent } from './components/limits-chart/limits-chart.component';
import { DeviationLimitsChartComponent } from './components/deviation-limits-chart/deviation-limits-chart.component';
import { PlanningChartComponent } from './components/planning-chart/planning-chart.component';
import { EcTooltipDirective } from '@widgets/EC/ec-widget-shared/directives/ec-tooltip.directive';
import { EcTooltipComponent } from '@widgets/EC/ec-widget-shared/components/ec-tooltip/ec-tooltip.component';

@NgModule({
    declarations: [
        LimitsChartComponent,
        DeviationLimitsChartComponent,
        PlanningChartComponent,
        EcTooltipDirective,
        EcTooltipComponent
    ],
    imports: [CommonModule],
    exports: [
        LimitsChartComponent,
        DeviationLimitsChartComponent,
        PlanningChartComponent,
        EcTooltipDirective,
        EcTooltipComponent
    ]
})
export class EcWidgetSharedModule {
}
