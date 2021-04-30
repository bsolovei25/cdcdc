import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOfOutagesComponent } from '@widgets/CMID/number-of-outages/number-of-outages.component';
import { SharedModule } from "@shared/shared.module";
import { NumberOfOutagesCardComponent } from './components/number-of-outages-card/number-of-outages-card.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [NumberOfOutagesComponent, NumberOfOutagesCardComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatExpansionModule
    ]
})
export class NumberOfOutagesModule {
    enterComponent = NumberOfOutagesComponent;
}
