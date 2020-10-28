import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupsComponent } from './product-groups.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [ProductGroupsComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, HttpClientModule],
})
export class ProductGroupsModule {
    enterComponent = ProductGroupsComponent;
}
