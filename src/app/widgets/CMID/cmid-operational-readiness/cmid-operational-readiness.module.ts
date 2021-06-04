import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CmidOperationalReadinessVprChartComponent } from './cmid-operational-readiness-vpr-chart/cmid-operational-readiness-vpr-chart.component';
import { CmidOperationalReadinessComponent } from './cmid-operational-readiness.component';

@NgModule({
    declarations: [
        CmidOperationalReadinessComponent,
        CmidOperationalReadinessVprChartComponent,
    ],
    imports: [
        CommonModule, 
        SharedModule, 
        AngularSvgIconModule,
    ]
})
export class CmidOperationalReadinessModule {
    enterComponent = CmidOperationalReadinessComponent;
}