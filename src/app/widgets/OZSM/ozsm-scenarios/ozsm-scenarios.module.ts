import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { OzsmScenariosComponent } from './ozsm-scenarios.component';
import { MatRippleModule } from "@angular/material/core";



@NgModule({
  declarations: [OzsmScenariosComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
    MatSelectModule,
    SharedModule,
    MatRippleModule
  ]
})
export class OzsmScenariosModule {
  enterComponent = OzsmScenariosComponent
}
