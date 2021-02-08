import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmCirclePlanningDiagramComponent } from './ozsm-circle-planning-diagram.component';
import { OzsmSharedModule } from '../ozsm-shared/ozsm-shared.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [OzsmCirclePlanningDiagramComponent],
    imports: [CommonModule, OzsmSharedModule, SharedModule],
})
export class OzsmCirclePlanningDiagramModule {
    enterComponent = OzsmCirclePlanningDiagramComponent;
}
