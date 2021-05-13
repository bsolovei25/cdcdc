import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcWidgetPlaningChartsComponent } from './ec-widget-planing-charts.component';
import { SharedModule } from '../../../@shared/shared.module';
import { EcWidgetPlanningCardComponent } from './components/ec-widget-planning-card/ec-widget-planning-card.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EcWidgetSharedModule } from '../ec-widget-shared/ec-widget-shared.module';

@NgModule({
    declarations: [EcWidgetPlaningChartsComponent, EcWidgetPlanningCardComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, EcWidgetSharedModule],
})
export class EcWidgetPlaningChartsModule {
    enterComponent = EcWidgetPlaningChartsComponent;
}
