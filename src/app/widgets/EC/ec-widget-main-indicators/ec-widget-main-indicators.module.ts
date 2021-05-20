import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcWidgetMainIndicatorsComponent } from './ec-widget-main-indicators.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { EcWidgetMainIndicatorsItemComponent } from './components/ec-widget-main-indicators-item/ec-widget-main-indicators-item.component';
import { AstueOnpzService } from "@widgets/ASTUE-ONPZ/astue-onpz-shared/astue-onpz.service";

@NgModule({
    declarations: [EcWidgetMainIndicatorsComponent, EcWidgetMainIndicatorsItemComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSlideToggleModule, MatRippleModule],
    providers: [AstueOnpzService]
})
export class EcWidgetMainIndicatorsModule {
    enterComponent = EcWidgetMainIndicatorsComponent;
}
