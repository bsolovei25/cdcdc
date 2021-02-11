import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzPredictorsComponent } from './astue-onpz-predictors.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AstueOnpzPredictorsComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSlideToggleModule, FormsModule],
})
export class AstueOnpzPredictorsModule {
    enterComponent = AstueOnpzPredictorsComponent;
}
