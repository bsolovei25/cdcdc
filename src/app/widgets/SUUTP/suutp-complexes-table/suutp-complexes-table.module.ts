import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuutpComplexesTableComponent } from './suutp-complexes-table.component';
import { SuutpHeaderComponent } from './components/suutp-header/suutp-header.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [SuutpComplexesTableComponent, SuutpHeaderComponent],
    imports: [CommonModule, MatTableModule, SharedModule, AngularSvgIconModule],
})
export class SuutpComplexesTableModule {
    enterComponent = SuutpComplexesTableComponent;
}
