import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupsShortComponent } from './product-groups-short.component';
import { SharedModule } from '../../../@shared/shared.module';
import { SmpSharedModule } from '../smp-shared/smp-shared.module';

@NgModule({
    declarations: [ProductGroupsShortComponent],
    imports: [CommonModule, SharedModule, HttpClientModule, SmpSharedModule]
})
export class ProductGroupsShortModule {
    enterComponent = ProductGroupsShortComponent;
}
