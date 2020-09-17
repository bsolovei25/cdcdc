import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OzsmTripleDiagramCardComponent } from './ozsm-triple-diagram-card/ozsm-triple-diagram-card.component';
import { OzsmCircleDiagramComponent } from './ozsm-circle-diagram/ozsm-circle-diagram.component';
import { OzsmStorageTankComponent } from './ozsm-triple-diagram-card/ozsm-storage-tank/ozsm-storage-tank.component';
import { OzsmEqualizerChartComponent } from './ozsm-equalizer-chart/ozsm-equalizer-chart.component';
import { OzsmLoadingParksComponent } from "./ozsm-loading-parks/ozsm-loading-parks.component";
import { OzsmLoadingParksBodyComponent } from "./ozsm-loading-parks/components/ozsm-loading-parks-body/ozsm-loading-parks-body.component";
import { OzsmLoadingParksDiagramComponent } from "./ozsm-loading-parks/components/ozsm-loading-parks-diagram/ozsm-loading-parks-diagram.component";
import { OzsmLoadingParksHeaderComponent } from "./ozsm-loading-parks/components/ozsm-loading-parks-header/ozsm-loading-parks-header.component";

@NgModule({
    declarations: [
        OzsmTripleDiagramCardComponent,
        OzsmCircleDiagramComponent,
        OzsmStorageTankComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingParksComponent,
        OzsmLoadingParksBodyComponent,
        OzsmLoadingParksDiagramComponent,
        OzsmLoadingParksHeaderComponent,
    ],
    exports: [
        OzsmTripleDiagramCardComponent,
        OzsmCircleDiagramComponent,
        OzsmStorageTankComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingParksComponent,
        OzsmLoadingParksBodyComponent,
        OzsmLoadingParksDiagramComponent,
        OzsmLoadingParksHeaderComponent,
    ],

    imports: [
        CommonModule,
        SharedModule
    ],
})
export class OzsmSharedModule {
}
