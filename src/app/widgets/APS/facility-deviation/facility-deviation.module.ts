import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDeviationComponent } from './facility-deviation.component';
import { FacilityDeviationElementComponent } from './facility-deviation-element/facility-deviation-element.component';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [FacilityDeviationComponent, FacilityDeviationElementComponent],
    imports: [CommonModule, DashboardModule, SharedModule, AngularSvgIconModule],
})
export class FacilityDeviationModule {
    enterComponent = FacilityDeviationComponent;
}
