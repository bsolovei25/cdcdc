import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviationCircleDiagramComponent } from './deviation-circle-diagram.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [DeviationCircleDiagramComponent],
    imports: [CommonModule, SharedModule],
})
export class DeviationCircleDiagramModule {
    enterComponent = DeviationCircleDiagramComponent;
}
