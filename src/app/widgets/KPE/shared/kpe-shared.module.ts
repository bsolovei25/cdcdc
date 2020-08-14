import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';
import { KpeGaudeChartComponent } from './kpe-gaude-chart/kpe-gaude-chart.component';
import { KpeDeviationDiagramComponent } from './kpe-deviation-diagram/kpe-deviation-diagram.component';
import { CommonModule } from '@angular/common';
import { KpeGaugeChartComponent } from './kpe-gauge-chart/kpe-gauge-chart.component';

@NgModule({
    declarations: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaudeChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent
    ],
    exports: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaudeChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent
    ],
    imports: [CommonModule],
})
export class KpeSharedModule {}
