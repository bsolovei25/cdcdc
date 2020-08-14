import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzBigPlanningChartComponent } from './astue-onpz-big-planning-chart.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [AstueOnpzBigPlanningChartComponent],
    imports: [CommonModule, SharedModule],
})
export class AstueOnpzBigPlanningChartModule {
    enterComponent = AstueOnpzBigPlanningChartComponent;
}
