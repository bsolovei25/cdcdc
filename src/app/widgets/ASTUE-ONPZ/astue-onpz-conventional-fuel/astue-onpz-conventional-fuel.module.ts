import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzConventionalFuelComponent } from './astue-onpz-conventional-fuel.component';
import { AstueOnpzInteractiveIndicatorsComponent } from './components/astue-onpz-interactive-indicators/astue-onpz-interactive-indicators.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [AstueOnpzConventionalFuelComponent, AstueOnpzInteractiveIndicatorsComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        MatFormFieldModule,
        MatSelectModule,
    ]
})
export class AstueOnpzConventionalFuelModule {
    enterComponent = AstueOnpzConventionalFuelComponent;
}
