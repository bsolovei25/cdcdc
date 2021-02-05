import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzInteractiveIndicatorsComponent } from './astue-onpz-interactive-indicators.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [AstueOnpzInteractiveIndicatorsComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatFormFieldModule, MatSelectModule],
})
export class AstueOnpzInteractiveIndicatorsModule {
    enterComponent = AstueOnpzInteractiveIndicatorsComponent;
}
