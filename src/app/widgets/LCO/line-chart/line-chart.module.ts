import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LineChartComponent } from './line-chart.component';

@NgModule({
    declarations: [LineChartComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class LineChartModule {
    enterComponent = LineChartComponent;
}
