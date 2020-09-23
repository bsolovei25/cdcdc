import { OzsmResourcesCircleDiagramVisualComponent } from './ozsm-resources-circle-diagram/components/ozsm-resources-circle-diagram-visual/ozsm-resources-circle-diagram-visual.component';
import { OzsmResourcesCircleDiagramComponent } from 'src/app/widgets/OZSM/ozsm-shared/ozsm-resources-circle-diagram/ozsm-resources-circle-diagram.component';
import { OzsmLineDiagramComponent } from './ozsm-line-diagram/ozsm-line-diagram.component';
import { OzsmCardLineDiagramComponent } from './ozsm-card-line-diagram/ozsm-card-line-diagram.component';
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
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OzsmCircleDiagramFullComponent } from './ozsm-circle-diagram-full/ozsm-circle-diagram-full.component';
import { OzsmLoadingSpaceComponent } from './ozsm-loading-space/ozsm-loading-space.component';
import { OzsmMainIndicatorComponent } from './ozsm-main-indicator/ozsm-main-indicator.component';
import { OzsmCircleDiagramIconComponent } from './ozsm-circle-diagram-icon/ozsm-cirle-diagram-icon.component';
import { OzsmMainToggleComponent } from '../ozsm-main-toggle/ozsm-main-toggle.component';
import { MatRippleModule } from "@angular/material/core";


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
        OzsmMainIndicatorComponent,
        OzsmLoadingSpaceComponent,
        OzsmCardLineDiagramComponent,
        OzsmCircleDiagramFullComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingSpaceComponent,
        OzsmMainIndicatorComponent,
        OzsmCircleDiagramIconComponent,
        OzsmMainToggleComponent
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
        OzsmMainIndicatorComponent,
        OzsmLoadingSpaceComponent,
        OzsmCardLineDiagramComponent,
        OzsmCircleDiagramFullComponent,
        OzsmEqualizerChartComponent,
        OzsmLoadingSpaceComponent,
        OzsmMainIndicatorComponent,
        OzsmCircleDiagramIconComponent,
        OzsmMainToggleComponent
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
