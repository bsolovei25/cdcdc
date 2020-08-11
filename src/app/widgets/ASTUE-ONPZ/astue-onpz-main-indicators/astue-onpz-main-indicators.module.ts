import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzMainIndicatorsComponent } from './astue-onpz-main-indicators.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
    declarations: [AstueOnpzMainIndicatorsComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatSlideToggleModule,
    ]
})
export class AstueOnpzMainIndicatorsModule {
    enterComponent = AstueOnpzMainIndicatorsComponent;
}
