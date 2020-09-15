import { OzsmResourcesCircleDiagramComponent } from './ozsm-resources-circle-diagram.component';
import { SharedModule } from './../../../../@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OzsmResourcesCircleDiagramVisualComponent } from './components/ozsm-resources-circle-diagram-visual/ozsm-resources-circle-diagram-visual.component';

@NgModule({
    declarations: [
        OzsmResourcesCircleDiagramComponent,
        OzsmResourcesCircleDiagramVisualComponent
    ],
    imports: [
        CommonModule, 
        HttpClientModule,
        SharedModule
    ]
})
export class OzsmResourcesCircleDiagramModule {
    enterComponent = OzsmResourcesCircleDiagramComponent;
}