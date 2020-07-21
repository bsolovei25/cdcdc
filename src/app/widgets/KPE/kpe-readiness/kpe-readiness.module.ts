import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeReadinessComponent } from './kpe-readiness.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    declarations: [KpeReadinessComponent],
    imports: [
        CommonModule,
        SharedModule,
        KpeSharedModule,
        AngularSvgIconModule
    ]
})
export class KpeReadinessModule {
    enterComponent = KpeReadinessComponent;
}
