import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImplementationPieComponent } from './components/implementation-pie/implementation-pie.component';
import { ImplementationPlanComponent } from './implementation-plan.component';
import { ImplementationTankComponent } from './components/implementation-tank/implementation-tank.component';
import { ImplementationsComponent } from './components/implementations/implementations.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        ImplementationPlanComponent,
        ImplementationPieComponent,
        ImplementationTankComponent,
        ImplementationsComponent,
    ],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class ImplementationPlanModule {
    enterComponent = ImplementationPlanComponent;
}
