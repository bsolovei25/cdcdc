
import { NgModule } from '@angular/core';
import { KpeLineDiagramComponent } from './kpe-line-diagram/kpe-line-diagram.component';
import { KpeLineChartComponent } from './kpe-line-chart/kpe-line-chart.component';

@NgModule({
    declarations: [
        KpeLineDiagramComponent,
        KpeLineChartComponent,
    ],
    exports: [
        KpeLineDiagramComponent,
        KpeLineChartComponent
    ],
    imports: [],
})
export class KpeSharedModule { }
