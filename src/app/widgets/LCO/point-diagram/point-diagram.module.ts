import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneColumnComponent } from './one-column/one-column.component';
import { PointDiagramComponent } from './point-diagram.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardModule } from '../../../dashboard/dashboard.module';

@NgModule({
    declarations: [OneColumnComponent, PointDiagramComponent],
    imports: [CommonModule, SharedModule, DashboardModule],
    exports: [],
})
export class PointDiagramModule {
    enterComponent = PointDiagramComponent;
}
