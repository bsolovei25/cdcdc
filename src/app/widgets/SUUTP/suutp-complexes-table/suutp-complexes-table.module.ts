import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuutpComplexesTableComponent } from './suutp-complexes-table.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SUUTPSharedModule } from "@widgets/SUUTP/shared/shared.module";

@NgModule({
  declarations: [SuutpComplexesTableComponent],
    imports: [CommonModule, MatTableModule, SharedModule, AngularSvgIconModule, SUUTPSharedModule],
})
export class SuutpComplexesTableModule {
    enterComponent = SuutpComplexesTableComponent;
}
