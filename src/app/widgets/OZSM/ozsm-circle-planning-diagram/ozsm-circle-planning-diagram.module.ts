import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmCirclePlanningDiagramComponent } from './ozsm-circle-planning-diagram.component';
import { OzsmSharedModule } from '../ozsm-shared/ozsm-shared.module';



@NgModule({
  declarations: [OzsmCirclePlanningDiagramComponent],
    imports: [
        CommonModule,
        OzsmSharedModule
    ]
})
export class OzsmCirclePlanningDiagramModule {
    enterComponent = OzsmCirclePlanningDiagramComponent;
}
