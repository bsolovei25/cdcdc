import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { BarChartsComponent } from './bar-charts.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [BarChartsComponent, BarChartComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
    ]
})
export class BarChartsModule {
    enterComponent = BarChartsComponent;
}
