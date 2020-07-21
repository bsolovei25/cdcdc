import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';
import { KpeGaudeChartComponent } from './kpe-gaude-chart/kpe-gaude-chart.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [KpeLineDiagramComponent, KpeLineChartComponent, KpeGaudeChartComponent],
    exports: [KpeLineDiagramComponent, KpeLineChartComponent, KpeGaudeChartComponent],
    imports: [CommonModule],
})
export class KpeSharedModule {}
