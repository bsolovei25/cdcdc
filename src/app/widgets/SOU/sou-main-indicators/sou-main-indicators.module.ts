import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouMainIndicatorsComponent } from './sou-main-indicators.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { KpeSharedModule } from '../../KPE/shared/kpe-shared.module';
import { SouOperationalAccountingSystemModule } from '../sou-operational-accounting-system/sou-operational-accounting-system.module';

@NgModule({
    declarations: [SouMainIndicatorsComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, KpeSharedModule, SouOperationalAccountingSystemModule],
})
export class SouMainIndicatorsModule {
    enterComponent = SouMainIndicatorsComponent;
}
