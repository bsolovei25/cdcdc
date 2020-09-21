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
import { OzsmMainToggleComponent } from '../ozsm-main-toggle/ozsm-main-toggle.component';
import { MatRippleModule } from "@angular/material/core";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OzsmListPackingDiagramsComponent } from './ozsm-list-packing-diagrams/ozsm-list-packing-diagrams.component';
import { OzsmListPackingDiagramsItemComponent } from './ozsm-list-packing-diagrams/components/ozsm-list-packing-diagrams-item/ozsm-list-packing-diagrams-item.component';

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
        OzsmMainToggleComponent,
        OzsmListPackingDiagramsComponent,
        OzsmListPackingDiagramsItemComponent
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
        OzsmListPackingDiagramsComponent,
        OzsmListPackingDiagramsItemComponent
    ],

  imports: [
    CommonModule,
    SharedModule,
    MatRippleModule,
      AngularSvgIconModule
  ]
})
export class OzsmSharedModule {
}
