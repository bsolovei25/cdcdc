import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmLineDiagramsComponent } from './ozsm-line-diagrams.component';
import { OzsmLineDiagramComponent } from '../ozsm-shared/ozsm-line-diagram/ozsm-line-diagram.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [OzsmLineDiagramsComponent, OzsmLineDiagramComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule
    ]
})
export class OzsmLineDiagramsModule {
    enterComponent = OzsmLineDiagramsComponent
}
