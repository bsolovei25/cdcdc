import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmidDynamicsOfMetricsChangeComponent } from "@widgets/CMID/cmid-dynamics-of-metrics-change/cmid-dynamics-of-metrics-change.component";
import {SharedModule} from "@shared/shared.module";
import { CmidDynamicsOfMetricsChangeHeaderComponent } from './components/cmid-dynamics-of-metrics-change-header/cmid-dynamics-of-metrics-change-header.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import { CmidDynamicsOfMetricsChangeChartComponent } from './components/cmid-dynamics-of-metrics-change-chart/cmid-dynamics-of-metrics-change-chart.component';
import {AstueOnpzSharedModule} from "@widgets/ASTUE-ONPZ/astue-onpz-shared/astue-onpz-shared.module";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [CmidDynamicsOfMetricsChangeComponent, CmidDynamicsOfMetricsChangeHeaderComponent, CmidDynamicsOfMetricsChangeChartComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        AstueOnpzSharedModule,
        MatSelectModule
    ]
})
export class CmidDynamicsOfMetricsChangeModule {
    enterComponent = CmidDynamicsOfMetricsChangeComponent;
}
