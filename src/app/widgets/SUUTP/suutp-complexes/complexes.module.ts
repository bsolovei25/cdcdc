import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexesComponent } from './complexes.component';
import { ComplexesIndicatorComponent } from './components/complexes-indicator/complexes-indicator.component';
import { ComplexesDataListComponent } from './components/complexes-data-list/complexes-data-list.component';
import { KpeSharedModule } from '@widgets/KPE/shared/kpe-shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ComplexesHeaderComponent } from '@widgets/SUUTP/suutp-complexes/components/complexes-header/complexes-header.component';
import { ComplexesDataItemComponent } from '@widgets/SUUTP/suutp-complexes/components/complexes-data-item/complexes-data-item.component';
import { ComplexesItemComponent } from './components/complexes-item/complexes-item.component';
import { SharedModule } from "@shared/shared.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        ComplexesHeaderComponent,
        ComplexesDataItemComponent,
        ComplexesComponent,
        ComplexesIndicatorComponent,
        ComplexesDataListComponent,
        ComplexesItemComponent,
    ],
    imports: [CommonModule, SharedModule, KpeSharedModule, HttpClientModule, AngularSvgIconModule],
})
export class ComplexesModule {
    enterComponent = ComplexesComponent;
}
