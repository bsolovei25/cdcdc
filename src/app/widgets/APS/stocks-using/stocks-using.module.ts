import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksUsingElementComponent } from './components/stocks-using-element/stocks-using-element.component';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { StocksUsingComponent } from './stocks-using.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [StocksUsingComponent, StocksUsingElementComponent],
    imports: [CommonModule, DashboardModule, SharedModule, AngularSvgIconModule],
})
export class StocksUsingModule {
    enterComponent = StocksUsingComponent;
}
