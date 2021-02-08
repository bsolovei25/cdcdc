import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmDiagramsWidgetComponent } from './ozsm-diagrams-widget.component';
import { SharedModule } from '@shared/shared.module';
import { OzsmSharedModule } from '../ozsm-shared/ozsm-shared.module';
import { OzsmDiagramsCardComponent } from './ozsm-diagrams-card/ozsm-diagrams-card.component';

@NgModule({
    declarations: [OzsmDiagramsWidgetComponent],
    imports: [CommonModule, SharedModule, OzsmSharedModule],
    exports: [OzsmDiagramsCardComponent],
})
export class OzsmDiagramsWidgetModule {
    enterComponent = OzsmDiagramsWidgetComponent;
}
