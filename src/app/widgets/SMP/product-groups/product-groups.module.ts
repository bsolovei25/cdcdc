import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupsComponent } from './product-groups.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SmpSharedModule } from '../smp-shared/smp-shared.module';

@NgModule({
    declarations: [ProductGroupsComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, HttpClientModule, SmpSharedModule]
})
export class ProductGroupsModule {
    enterComponent = ProductGroupsComponent;
}
