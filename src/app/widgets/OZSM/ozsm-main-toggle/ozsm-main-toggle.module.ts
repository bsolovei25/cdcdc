import { MatRippleModule } from '@angular/material/core';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OzsmMainToggleComponent } from "./ozsm-main-toggle.component";
import { OzsmSharedModule } from "../ozsm-shared/ozsm-shared.module";
import { SharedModule } from "@shared/shared.module";


@NgModule({
    declarations: [OzsmMainToggleComponent],
    imports: [
        CommonModule,
        SharedModule,
        OzsmSharedModule,
        MatRippleModule
    ]
})
export class OzsmMainToggleModule {
    enterComponent = OzsmMainToggleComponent;
}
