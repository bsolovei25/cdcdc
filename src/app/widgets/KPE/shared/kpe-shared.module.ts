import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';
import { KpeDeviationDiagramComponent } from './kpe-deviation-diagram/kpe-deviation-diagram.component';
import { KpeReadinessDeviationDiagramComponent } from './kpe-readiness-deviation-diagram/kpe-readiness-deviation-diagram.component';
import { KpeEqualizerChartComponent } from './kpe-equalizer-chart/kpe-equalizer-chart.component';
import { CommonModule } from '@angular/common';
import { KpeGaugeChartComponent } from './kpe-gauge-chart/kpe-gauge-chart.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { KpeHelperService } from './kpe-helper.service';
import { SharedModule } from '@shared/shared.module';
import { MatRippleModule } from '@angular/material/core';
import { KpeUniversalCardComponent } from './kpe-universal-card/kpe-universal-card.component';
import { KpeUniversalCardLineChartComponent } from './kpe-universal-card/components/kpe-universal-card-line-chart/kpe-universal-card-line-chart.component';

@NgModule({
    declarations: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent,
        KpeReadinessDeviationDiagramComponent,
        KpeEqualizerChartComponent,
        KpeUniversalCardComponent,
        KpeUniversalCardLineChartComponent,
    ],
    exports: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
        KpeGaugeChartComponent,
        KpeDeviationDiagramComponent,
        KpeReadinessDeviationDiagramComponent,
        KpeEqualizerChartComponent,
        KpeUniversalCardComponent
    ],
    imports: [CommonModule, AngularSvgIconModule, SharedModule, MatRippleModule],
    providers: [KpeHelperService],
})
export class KpeSharedModule {}
