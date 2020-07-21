
import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
    ],
    exports: [
        KpeLineDiagramComponent,
        KpeLineChartComponent
    ],
    imports: [
        CommonModule
    ],
})
export class KpeSharedModule { }
