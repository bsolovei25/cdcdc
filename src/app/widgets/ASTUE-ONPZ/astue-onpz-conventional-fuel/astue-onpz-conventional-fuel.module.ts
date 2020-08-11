import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzConventionalFuelComponent } from './astue-onpz-conventional-fuel.component';
import { AstueOnpzInteractiveIndicatorsComponent } from './components/astue-onpz-interactive-indicators/astue-onpz-interactive-indicators.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AstueOnpzMultiChartComponent } from './components/astue-onpz-multi-chart/astue-onpz-multi-chart.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [
        AstueOnpzConventionalFuelComponent,
        AstueOnpzInteractiveIndicatorsComponent,
        AstueOnpzMultiChartComponent,
    ],
    imports: [CommonModule, AngularSvgIconModule, SharedModule],
})
export class AstueOnpzConventionalFuelModule {
    enterComponent = AstueOnpzConventionalFuelComponent;
}
