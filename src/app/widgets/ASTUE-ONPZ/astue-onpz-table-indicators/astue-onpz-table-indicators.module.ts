import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AstueOnpzTableIndicatorsComponent } from './astue-onpz-table-indicators.component';



@NgModule({
  declarations: [AstueOnpzTableIndicatorsComponent],
  imports: [
      CommonModule,
      SharedModule,
      AngularSvgIconModule,
      MatCheckboxModule,
      FormsModule,
      MatTooltipModule
  ]
})
export class AstueOnpzTableIndicatorsModule {
    enterComponent = AstueOnpzTableIndicatorsComponent;
}
