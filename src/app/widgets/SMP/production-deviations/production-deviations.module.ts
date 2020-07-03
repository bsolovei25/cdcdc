import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionDeviationsComponent } from './production-deviations.component';
import { ProductionDeviationsColumnComponent } from './components/production-deviations-column/production-deviations-column.component';
import { ProductionDeviationsDiagramComponent } from './components/production-deviations-diagram/production-deviations-diagram.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        ProductionDeviationsComponent,
        ProductionDeviationsColumnComponent,
        ProductionDeviationsDiagramComponent,
    ],
    entryComponents: [ProductionDeviationsComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class ProductionDeviationsModule {
    enterComponent = ProductionDeviationsComponent;
}
