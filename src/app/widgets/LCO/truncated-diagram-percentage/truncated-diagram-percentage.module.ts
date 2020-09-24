import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatedDiagramPercentageComponent } from './truncated-diagram-percentage.component';
import { TruncatedDiagramPercentageItemComponent } from './truncated-diagram-percentage-item/truncated-diagram-percentage-item.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    declarations: [TruncatedDiagramPercentageComponent, TruncatedDiagramPercentageItemComponent],
    imports: [
        CommonModule,
        SharedModule,
        DashboardModule
    ]
})
export class TruncatedDiagramPercentageModule {
    enterComponent = TruncatedDiagramPercentageComponent;
}
