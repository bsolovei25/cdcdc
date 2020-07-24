import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplineTrendsChartComponent } from './spline-trends-chart.component';
import { SplineDiagramComponent } from './components/spline-diagram/spline-diagram.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [SplineTrendsChartComponent, SplineDiagramComponent],
    imports: [CommonModule, SharedModule],
})
export class SplineTrendsChartModule {
    enterComponent = SplineTrendsChartComponent;
}
