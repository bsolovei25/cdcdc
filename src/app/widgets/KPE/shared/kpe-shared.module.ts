import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';
import { KpeGaudeChartComponent } from './kpe-gaude-chart/kpe-gaude-chart.component';
import { KpeDeviationDiagramComponent } from './kpe-deviation-diagram/kpe-deviation-diagram.component';
import { KpeEqualizerChartComponent } from './kpe-equalizer-chart/kpe-equalizer-chart.component';
import { CommonModule } from '@angular/common';
import { KpeGaugeChartComponent } from './kpe-gauge-chart/kpe-gauge-chart.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaudeChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent,
        KpeEqualizerChartComponent
    ],
    exports: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaudeChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent,
        KpeEqualizerChartComponent
    ],
    imports: [CommonModule,
        AngularSvgIconModule
    ]
})
export class KpeSharedModule {
}
