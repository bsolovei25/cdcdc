import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzPredictorsComponent } from './astue-onpz-predictors.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AstueOnpzPredictorsItemComponent } from './components/astue-onpz-predictors-item/astue-onpz-predictors-item.component';

@NgModule({
    declarations: [AstueOnpzPredictorsComponent, AstueOnpzPredictorsItemComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSlideToggleModule, FormsModule],
})
export class AstueOnpzPredictorsModule {
    enterComponent = AstueOnpzPredictorsComponent;
}
