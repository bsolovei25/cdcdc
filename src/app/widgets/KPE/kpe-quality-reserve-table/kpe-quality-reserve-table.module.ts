import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityReserveTableComponent } from './kpe-quality-reserve-table.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { SharedModule } from "@shared/shared.module";
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [KpeQualityReserveTableComponent],
    imports: [CommonModule, AngularSvgIconModule, SharedModule, MatTableModule],
})
export class KpeQualityReserveTableModule {
    enterComponent: typeof KpeQualityReserveTableComponent = KpeQualityReserveTableComponent;
}
