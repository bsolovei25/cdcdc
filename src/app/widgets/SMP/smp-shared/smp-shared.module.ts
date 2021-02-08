import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupsLeftComponent } from './product-group/product-groups-left/product-groups-left.component';
import { ProductGroupsMiddleComponent } from './product-group/product-groups-middle/product-groups-middle.component';
import { ProductGroupsRightComponent } from './product-group/product-groups-right/product-groups-right.component';
import { ProductGroupsTableComponent } from './product-group/product-groups-table/product-groups-table.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        ProductGroupsLeftComponent,
        ProductGroupsMiddleComponent,
        ProductGroupsRightComponent,
        ProductGroupsTableComponent,
    ],
    exports: [ProductGroupsTableComponent],
    imports: [SharedModule, CommonModule, AngularSvgIconModule],
})
export class SmpSharedModule {}
