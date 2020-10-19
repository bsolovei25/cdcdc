import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStocksComponent } from './product-stocks.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    declarations: [ProductStocksComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule
    ]
})
export class ProductStocksModule {
    enterComponent = ProductStocksComponent;
}
