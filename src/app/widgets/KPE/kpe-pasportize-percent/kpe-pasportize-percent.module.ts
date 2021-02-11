import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpePasportizePercentComponent } from './kpe-pasportize-percent.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../../../@shared/shared.module';
import { KpePasportizePercentProductComponent } from './components/kpe-pasportize-percent-product/kpe-pasportize-percent-product.component';

@NgModule({
    declarations: [KpePasportizePercentComponent, KpePasportizePercentProductComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class KpePasportizePercentModule {
    enterComponent = KpePasportizePercentComponent;
}
