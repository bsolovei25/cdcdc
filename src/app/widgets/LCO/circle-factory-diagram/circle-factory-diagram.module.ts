import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleFactoryDiagramComponent } from './circle-factory-diagram.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CircleFactoryDiagramComponent],
    imports: [CommonModule, SharedModule],
})
export class CircleFactoryDiagramModule {
    enterComponent = CircleFactoryDiagramComponent;
}
