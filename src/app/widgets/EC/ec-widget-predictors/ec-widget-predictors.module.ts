import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcWidgetPredictorsComponent } from './ec-widget-predictors.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EcWidgetPredictorsItemComponent } from './components/ec-widget-predictors-item/ec-widget-predictors-item.component';

@NgModule({
    declarations: [EcWidgetPredictorsComponent, EcWidgetPredictorsItemComponent],
  imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule]
})
export class EcWidgetPredictorsModule {
    enterComponent = EcWidgetPredictorsComponent;
}
