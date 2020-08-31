import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeSharedModule } from '../shared/kpe-shared.module';
import { KpeEnergyComponent } from './kpe-energy.component';
import { KpeEnergyDiagramComponent } from './components/kpe-energy-diagram/kpe-energy-diagram.component';
import { KpeEnergyTabComponent } from './components/kpe-energy-tab/kpe-energy-tab.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [KpeEnergyComponent, KpeEnergyDiagramComponent, KpeEnergyTabComponent],
    imports: [CommonModule, KpeSharedModule, SharedModule, DashboardModule, AngularSvgIconModule],
})
export class KpeEnergyModule {
    enterComponent = KpeEnergyComponent;
}
