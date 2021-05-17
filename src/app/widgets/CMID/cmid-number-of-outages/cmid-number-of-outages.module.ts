import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmidNumberOfOutagesComponent } from '@widgets/CMID/cmid-number-of-outages/cmid-number-of-outages.component';
import { SharedModule } from "@shared/shared.module";
import { CmidNumberOfOutagesCardComponent } from './components/cmid-number-of-outages-card/cmid-number-of-outages-card.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [CmidNumberOfOutagesComponent, CmidNumberOfOutagesCardComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatExpansionModule,
        MatSelectModule
    ]
})
export class CmidNumberOfOutagesModule {
    enterComponent = CmidNumberOfOutagesComponent;
}
