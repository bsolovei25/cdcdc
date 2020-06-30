import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApsRecipeDiagramComponent } from './aps-recipe-diagram.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [ApsRecipeDiagramComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatCheckboxModule
  ]
})
export class ApsRecipeDiagramModule {
  enterComponent = ApsRecipeDiagramComponent;
}
