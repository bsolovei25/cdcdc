import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApsRecipeDiagramComponent } from './aps-recipe-diagram.component';



@NgModule({
  declarations: [ApsRecipeDiagramComponent],
  imports: [
    CommonModule
  ]
})
export class ApsRecipeDiagramModule {
  enterComponent = ApsRecipeDiagramComponent;
}
