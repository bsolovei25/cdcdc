import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuutpEquipmentFractionsProcessingComponent } from './suutp-equipment-fractions-processing.component';
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [SuutpEquipmentFractionsProcessingComponent],
    imports: [CommonModule, SharedModule],
})
export class SuutpEquipmentFractionsProcessingModule {
    enterComponent = SuutpEquipmentFractionsProcessingComponent;
}
