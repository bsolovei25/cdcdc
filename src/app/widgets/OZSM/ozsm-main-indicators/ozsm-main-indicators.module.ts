import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmMainIndicatorsComponent } from './ozsm-main-indicators.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class OzsmMainIndicatorsModule {
    enterComponent = OzsmMainIndicatorsComponent;
}
