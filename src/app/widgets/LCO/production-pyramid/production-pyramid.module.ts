import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionPyramidComponent } from './production-pyramid.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [ProductionPyramidComponent],
    imports: [CommonModule, SharedModule],
})
export class ProductionPyramidModule {
    enterComponent = ProductionPyramidComponent;
}
