import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmidProductionMapComponent } from "@widgets/CMID/cmid-production-map/cmid-production-map.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { SharedModule } from "@shared/shared.module";
import { CmidProductionMapBodyComponent } from './components/cmid-production-map-body/cmid-production-map-body.component';

@NgModule({
  declarations: [CmidProductionMapComponent, CmidProductionMapBodyComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        SharedModule
    ]
})
export class CmidProductionMapModule {
    enterComponent = CmidProductionMapComponent;
}
