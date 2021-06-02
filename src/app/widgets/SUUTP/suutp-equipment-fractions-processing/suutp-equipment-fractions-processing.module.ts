import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuutpEquipmentFractionsProcessingComponent } from './suutp-equipment-fractions-processing.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from "@shared/shared.module";
import { SuutpHeaderComponent } from './components/suutp-header/suutp-header.component';
import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
    declarations: [SuutpEquipmentFractionsProcessingComponent, SuutpHeaderComponent],
    imports: [CommonModule, MatTableModule, SharedModule, AngularSvgIconModule],
})
export class SuutpEquipmentFractionsProcessingModule {
    enterComponent = SuutpEquipmentFractionsProcessingComponent;
}
