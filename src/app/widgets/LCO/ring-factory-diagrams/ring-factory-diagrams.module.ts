import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RingFactoryDiagramsComponent } from './ring-factory-diagrams.component';
import { RingFactoryDiagramComponent } from './ring-factory-diagram/ring-factory-diagram.component';
import { SharedModule } from '../../../@shared/shared.module';


@NgModule({
    declarations: [RingFactoryDiagramsComponent, RingFactoryDiagramComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class RingFactoryDiagramsModule {
    enterComponent = RingFactoryDiagramsComponent;
}
