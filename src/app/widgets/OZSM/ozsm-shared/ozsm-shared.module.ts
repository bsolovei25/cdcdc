import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OzsmTripleDiagramCardComponent } from './ozsm-triple-diagram-card/ozsm-triple-diagram-card.component';
import { OzsmCircleDiagramComponent } from './ozsm-circle-diagram/ozsm-circle-diagram.component';
import { OzsmStorageTankComponent } from './ozsm-triple-diagram-card/ozsm-storage-tank/ozsm-storage-tank.component';
import { OzsmEqualizerChartComponent } from './ozsm-equalizer-chart/ozsm-equalizer-chart.component';
import { OzsmCardLineDiagramComponent } from './ozsm-card-line-diagram/ozsm-card-line-diagram.component';
import { OzsmCircleDiagramFullComponent } from './ozsm-circle-diagram-full/ozsm-circle-diagram-full.component';
import { OzsmLoadingSpaceComponent } from './ozsm-loading-space/ozsm-loading-space.component';
import { OzsmMainIndicatorComponent } from './ozsm-main-indicator/ozsm-main-indicator.component';
import { OzsmCirclePlanningDiagramPlanComponent } from './ozsm-circle-planning-diagram-plan/ozsm-circle-planning-diagram-plan.component';
import { OzsmCirclePlanningDiagramCardComponent } from './ozsm-circle-planning-diagram-card/ozsm-circle-planning-diagram-card.component';

@NgModule({
    declarations: [
        OzsmTripleDiagramCardComponent,
        OzsmCircleDiagramComponent,
        OzsmStorageTankComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingSpaceComponent,
        OzsmCardLineDiagramComponent,
        OzsmCircleDiagramFullComponent,
        OzsmMainIndicatorComponent,
        OzsmCirclePlanningDiagramPlanComponent,
        OzsmCirclePlanningDiagramCardComponent,
    ],
    exports: [
        OzsmTripleDiagramCardComponent,
        OzsmCircleDiagramComponent,
        OzsmStorageTankComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingSpaceComponent,
        OzsmCardLineDiagramComponent,
        OzsmCircleDiagramFullComponent,
        OzsmMainIndicatorComponent,
        OzsmCirclePlanningDiagramCardComponent,
        OzsmCirclePlanningDiagramPlanComponent
    ],

    imports: [
        CommonModule,
        SharedModule
    ],
})
export class OzsmSharedModule {
}
