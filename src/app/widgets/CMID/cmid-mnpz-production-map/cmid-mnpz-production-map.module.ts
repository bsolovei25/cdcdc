import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmidMnpzProductionMapComponent } from "@widgets/CMID/cmid-mnpz-production-map/cmid-mnpz-production-map.component";
import {AngularSvgIconModule} from "angular-svg-icon";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [CmidMnpzProductionMapComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        SharedModule
    ]
})
export class CmidMnpzProductionMapModule {
    enterComponent = CmidMnpzProductionMapComponent;
}
