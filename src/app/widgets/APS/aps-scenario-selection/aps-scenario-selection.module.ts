import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApsScenarioSelectionComponent } from './aps-scenario-selection.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
    declarations: [ApsScenarioSelectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatSelectModule,
    MatRippleModule
  ]
})
export class ApsScenarioSelectionModule {
    enterComponent = ApsScenarioSelectionComponent;
}
