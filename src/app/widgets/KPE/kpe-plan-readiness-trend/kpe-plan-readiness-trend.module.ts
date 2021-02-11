import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpePlanReadinessTrendComponent } from './kpe-plan-readiness-trend.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { KpeSharedModule } from '../shared/kpe-shared.module';

@NgModule({
    declarations: [KpePlanReadinessTrendComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, KpeSharedModule],
})
export class KpePlanReadinessTrendModule {
    enterComponent = KpePlanReadinessTrendComponent;
}
