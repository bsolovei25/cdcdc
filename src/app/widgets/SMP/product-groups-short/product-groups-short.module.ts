import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupsShortComponent } from './product-groups-short.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [ProductGroupsShortComponent],
    imports: [CommonModule, SharedModule],
})
export class ProductGroupsShortModule {
    enterComponent = ProductGroupsShortComponent;
}
