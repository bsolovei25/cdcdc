import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';
import { KpeDeviationDiagramComponent } from './kpe-deviation-diagram/kpe-deviation-diagram.component';
import { KpeEqualizerChartComponent } from './kpe-equalizer-chart/kpe-equalizer-chart.component';
import { CommonModule } from '@angular/common';
import { KpeGaugeChartComponent } from './kpe-gauge-chart/kpe-gauge-chart.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { KpeHelperService } from './kpe-helper.service';

@NgModule({
    declarations: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent,
        KpeEqualizerChartComponent,
    ],
    exports: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent,
        KpeEqualizerChartComponent,
    ],
    imports: [CommonModule, AngularSvgIconModule],
    providers: [KpeHelperService],
})
export class KpeSharedModule {}
