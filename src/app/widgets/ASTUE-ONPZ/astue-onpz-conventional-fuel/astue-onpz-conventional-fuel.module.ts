import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzConventionalFuelComponent } from './astue-onpz-conventional-fuel.component';
import { AstueOnpzInteractiveIndicatorsComponent } from './components/astue-onpz-interactive-indicators/astue-onpz-interactive-indicators.component';

@NgModule({
    declarations: [AstueOnpzConventionalFuelComponent, AstueOnpzInteractiveIndicatorsComponent],
    imports: [
        CommonModule
    ]
})
export class AstueOnpzConventionalFuelModule {
    enterComponent = AstueOnpzConventionalFuelComponent;
}
