import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityComponent } from './kpe-quality.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';
import { KpeEqualizerChartComponent } from '../kpe-equalizer-chart/kpe-equalizer-chart.component';
import { BarDiagramComponent } from '../kpe-equalizer-chart/components/bar-diagram/bar-diagram.component';

@NgModule({
    declarations: [
        KpeQualityComponent,
        KpeEqualizerChartComponent,
        BarDiagramComponent
    ],
    imports: [CommonModule, KpeSharedModule],
})
export class KpeQualityModule {
    enterComponent = KpeQualityComponent;
}
