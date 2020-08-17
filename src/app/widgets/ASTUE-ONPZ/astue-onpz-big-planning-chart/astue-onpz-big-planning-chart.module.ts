import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzBigPlanningChartComponent } from './astue-onpz-big-planning-chart.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AstueOnpzSharedModule } from '../astue-onpz-shared/astue-onpz-shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [AstueOnpzBigPlanningChartComponent],
    imports: [CommonModule, SharedModule, AstueOnpzSharedModule, AngularSvgIconModule],
})
export class AstueOnpzBigPlanningChartModule {
    enterComponent = AstueOnpzBigPlanningChartComponent;
}
