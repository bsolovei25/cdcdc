import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OzsmTripleDiagramCardComponent } from './ozsm-triple-diagram-card/ozsm-triple-diagram-card.component';
import { OzsmCircleDiagramComponent } from './ozsm-circle-diagram/ozsm-circle-diagram.component';
import { OzsmStorageTankComponent } from './ozsm-triple-diagram-card/ozsm-storage-tank/ozsm-storage-tank.component';
import { OzsmEqualizerChartComponent } from './ozsm-equalizer-chart/ozsm-equalizer-chart.component';
import { OzsmCircleDiagramFullComponent } from './ozsm-circle-diagram-full/ozsm-circle-diagram-full.component';

@NgModule({
    declarations: [
        OzsmTripleDiagramCardComponent,
        OzsmCircleDiagramComponent,
        OzsmStorageTankComponent,
        OzsmEqualizerChartComponent,
        OzsmCircleDiagramFullComponent,
    ],
    exports: [
        OzsmTripleDiagramCardComponent,
        OzsmCircleDiagramComponent,
        OzsmStorageTankComponent,
        OzsmEqualizerChartComponent,
        OzsmCircleDiagramFullComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
})
export class OzsmSharedModule {
}