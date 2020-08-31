import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzPlanningChartsComponent } from './astue-onpz-planning-charts.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AstueOnpzPlanningCardComponent } from './components/astue-onpz-planning-card/astue-onpz-planning-card.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AstueOnpzSharedModule } from '../astue-onpz-shared/astue-onpz-shared.module';

@NgModule({
    declarations: [AstueOnpzPlanningChartsComponent, AstueOnpzPlanningCardComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, AstueOnpzSharedModule],
})
export class AstueOnpzPlanningChartsModule {
    enterComponent = AstueOnpzPlanningChartsComponent;
}
