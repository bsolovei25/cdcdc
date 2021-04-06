import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzMainIndicatorsComponent } from './astue-onpz-main-indicators.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { AstueOnpzMainIndicatorsItemComponent } from './components/astue-onpz-main-indicators-item/astue-onpz-main-indicators-item.component';

@NgModule({
    declarations: [AstueOnpzMainIndicatorsComponent, AstueOnpzMainIndicatorsItemComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSlideToggleModule, MatRippleModule],
})
export class AstueOnpzMainIndicatorsModule {
    enterComponent = AstueOnpzMainIndicatorsComponent;
}
