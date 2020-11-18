import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzConventionalFuelComponent } from './astue-onpz-conventional-fuel.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AstueOnpzMultiChartComponent } from './components/astue-onpz-multi-chart/astue-onpz-multi-chart.component';
import { SharedModule } from '../../../@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { AstueOnpzBigPlanningChartComponent } from './components/astue-onpz-big-planning-chart/astue-onpz-big-planning-chart.component';
import { AstueOnpzSharedModule } from '../astue-onpz-shared/astue-onpz-shared.module';
import { AstueOnpzSelectComponent } from './components/astue-onpz-select/astue-onpz-select.component';

@NgModule({
  declarations: [
    AstueOnpzConventionalFuelComponent,
    AstueOnpzMultiChartComponent,
    AstueOnpzBigPlanningChartComponent,
    AstueOnpzSelectComponent
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRippleModule,
    AstueOnpzSharedModule
  ],
  exports: [
    AstueOnpzSelectComponent
  ]
})
export class AstueOnpzConventionalFuelModule {
    enterComponent = AstueOnpzConventionalFuelComponent;
}
