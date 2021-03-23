import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityReserveTableComponent } from './kpe-quality-reserve-table.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { SharedModule } from "@shared/shared.module";
import { MatTableModule } from '@angular/material/table';
import { KpeQualityReserveTableItemComponent } from './components/kpe-quality-reserve-table-item/kpe-quality-reserve-table-item.component';

@NgModule({
    declarations: [KpeQualityReserveTableComponent, KpeQualityReserveTableItemComponent],
    imports: [CommonModule, AngularSvgIconModule, SharedModule, MatTableModule],
})
export class KpeQualityReserveTableModule {
    enterComponent: typeof KpeQualityReserveTableComponent = KpeQualityReserveTableComponent;
}
