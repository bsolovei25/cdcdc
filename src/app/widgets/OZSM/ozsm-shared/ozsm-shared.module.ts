import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OzsmCardLineDiagramComponent } from './ozsm-card-line-diagram/ozsm-card-line-diagram.component';
import { OzsmTripleDiagramCardComponent } from './ozsm-triple-diagram-card/ozsm-triple-diagram-card.component';
import { OzsmCircleDiagramComponent } from './ozsm-circle-diagram/ozsm-circle-diagram.component';
import { OzsmStorageTankComponent } from './ozsm-triple-diagram-card/ozsm-storage-tank/ozsm-storage-tank.component';
import { OzsmEqualizerChartComponent } from './ozsm-equalizer-chart/ozsm-equalizer-chart.component';
import { OzsmLoadingParksComponent } from "./ozsm-loading-parks/ozsm-loading-parks.component";
import { OzsmLoadingParksBodyComponent } from "./ozsm-loading-parks/components/ozsm-loading-parks-body/ozsm-loading-parks-body.component";
import { OzsmLoadingParksDiagramComponent } from "./ozsm-loading-parks/components/ozsm-loading-parks-diagram/ozsm-loading-parks-diagram.component";
import { OzsmLoadingParksHeaderComponent } from "./ozsm-loading-parks/components/ozsm-loading-parks-header/ozsm-loading-parks-header.component";
import { OzsmCircleDiagramFullComponent } from './ozsm-circle-diagram-full/ozsm-circle-diagram-full.component';
import { OzsmLoadingSpaceComponent } from './ozsm-loading-space/ozsm-loading-space.component';
import { OzsmMainIndicatorComponent } from './ozsm-main-indicator/ozsm-main-indicator.component';
import { OzsmCirclePlanningDiagramPlanComponent } from './ozsm-circle-planning-diagram-plan/ozsm-circle-planning-diagram-plan.component';
import { OzsmCirclePlanningDiagramCardComponent } from './ozsm-circle-planning-diagram-card/ozsm-circle-planning-diagram-card.component';
import { OzsmCircleDiagramIconComponent } from './ozsm-circle-diagram-icon/ozsm-cirle-diagram-icon.component';
import { MatRippleModule } from "@angular/material/core";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OzsmListPackingDiagramsComponent } from './ozsm-list-packing-diagrams/ozsm-list-packing-diagrams.component';
import { OzsmListPackingDiagramsItemComponent } from './ozsm-list-packing-diagrams/components/ozsm-list-packing-diagrams-item/ozsm-list-packing-diagrams-item.component';
import { OzsmGraphCircleDiagramComponent } from "./ozsm-graph-circle-diagram/ozsm-graph-circle-diagram.component";



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
        OzsmLoadingSpaceComponent,
        OzsmCardLineDiagramComponent,
        OzsmCircleDiagramFullComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingSpaceComponent,
        OzsmMainIndicatorComponent,
        OzsmCirclePlanningDiagramPlanComponent,
        OzsmCirclePlanningDiagramCardComponent,
        OzsmListPackingDiagramsComponent,
        OzsmListPackingDiagramsItemComponent,
        OzsmCircleDiagramIconComponent,
        OzsmCircleDiagramIconComponent,
        OzsmGraphCircleDiagramComponent
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
        OzsmLoadingSpaceComponent,
        OzsmCardLineDiagramComponent,
        OzsmCircleDiagramFullComponent,
        OzsmMainIndicatorComponent,
        OzsmCirclePlanningDiagramCardComponent,
        OzsmCirclePlanningDiagramPlanComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingSpaceComponent,
        OzsmListPackingDiagramsComponent,
        OzsmListPackingDiagramsItemComponent,
        OzsmCircleDiagramIconComponent,
        OzsmCircleDiagramIconComponent,
        OzsmGraphCircleDiagramComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatRippleModule
    ]
})
export class OzsmSharedModule {
}
