import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmCirclePlanningDiagramComponent } from './ozsm-circle-planning-diagram.component';



@NgModule({
  declarations: [OzsmCirclePlanningDiagramComponent],
  imports: [
    CommonModule,
  ]
})
export class OzsmCirclePlanningDiagramModule {
    enterComponent = OzsmCirclePlanningDiagramComponent;
}
