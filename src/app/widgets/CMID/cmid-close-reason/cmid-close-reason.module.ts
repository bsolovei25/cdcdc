import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';

import { CmidCloseReasonComponent } from './cmid-close-reason.component';
import { CmidCloseReasonVariationChartComponent } from './components/cmid-close-reason-variation-chart/cmid-close-reason-variation-chart.component';
import { CmidCloseReasonVprChartComponent } from './components/cmid-close-reason-vpr-chart/cmid-close-reason-vpr-chart.component';
import { CmidCloseReasonGroupsChartComponent } from './components/cmid-close-reason-groups-chart/cmid-close-reason-groups-chart.component';
import { CmidCloseReasonOperationalChartComponent } from './components/cmid-close-reason-operational-chart/cmid-close-reason-operational-chart.component';

@NgModule({
    declarations: [
        CmidCloseReasonComponent,
        CmidCloseReasonOperationalChartComponent,
        CmidCloseReasonVariationChartComponent,
        CmidCloseReasonVprChartComponent,
        CmidCloseReasonGroupsChartComponent
    ],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class CmidCloseReasonModule {
    enterComponent = CmidCloseReasonComponent;
}
