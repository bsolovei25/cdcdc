import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzProductChartsComponent } from './astue-onpz-product-charts.component';
import { AstueOnpzSharedModule } from '../astue-onpz-shared/astue-onpz-shared.module';
import { AstueOnpzProductCardComponent } from './components/astue-onpz-product-card/astue-onpz-product-card.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [AstueOnpzProductChartsComponent, AstueOnpzProductCardComponent],
    imports: [CommonModule, AstueOnpzSharedModule, SharedModule, AngularSvgIconModule],
})
export class AstueOnpzProductChartsModule {
    enterComponent = AstueOnpzProductChartsComponent;
}
