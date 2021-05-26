import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuutpChartsComponent } from './suutp-charts.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { SharedModule } from '@shared/shared.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BarColumnComponent } from './bar-chart/bar-column/bar-column.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { SuutpChartsHeaderComponent } from './suutp-charts-header/suutp-charts-header.component';

@NgModule({
  declarations: [SuutpChartsComponent, GaugeChartComponent, LineChartComponent, BarChartComponent, BarColumnComponent, SuutpChartsHeaderComponent],
    imports: [
        CommonModule, SharedModule, AngularSvgIconModule
    ]
})
export class SuutpChartsModule {
    enterComponent = SuutpChartsComponent;
}
