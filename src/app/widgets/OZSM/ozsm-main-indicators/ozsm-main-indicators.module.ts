import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmMainIndicatorsComponent } from './ozsm-main-indicators.component';
import { SharedModule } from '@shared/shared.module';
import { OzsmSharedModule } from "../ozsm-shared/ozsm-shared.module";
import { OzsmMainIndicatorComponent } from "../ozsm-shared/ozsm-main-indicator/ozsm-main-indicator.component";

@NgModule({
    declarations: [OzsmMainIndicatorsComponent, OzsmMainIndicatorComponent],
    imports: [
        CommonModule,
        SharedModule,
        OzsmSharedModule,
    ]
})
export class OzsmMainIndicatorsModule {
    enterComponent = OzsmMainIndicatorsComponent;
}
