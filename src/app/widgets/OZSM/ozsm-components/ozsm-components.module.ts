import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmComponentsComponent } from './ozsm-components.component';
import { OzsmLineDiagramComponent } from '../ozsm-shared/ozsm-line-diagram/ozsm-line-diagram.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [OzsmComponentsComponent, OzsmLineDiagramComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class OzsmComponentsModule {
}
