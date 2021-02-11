import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApsGanttChartComponent } from './aps-gantt-chart.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ApsGanttChartRowComponent } from './components/aps-gantt-chart-row/aps-gantt-chart-row.component';

@NgModule({
    declarations: [ApsGanttChartComponent, ApsGanttChartRowComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class ApsGanttChartModule {
    enterComponent = ApsGanttChartComponent;
}
