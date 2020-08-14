import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzPlanningChartsComponent } from './astue-onpz-planning-charts.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [AstueOnpzPlanningChartsComponent],
    imports: [CommonModule, SharedModule],
})
export class AstueOnpzPlanningChartsModule {
    enterComponent = AstueOnpzPlanningChartsComponent;
}
