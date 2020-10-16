import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OilOperationsComponent } from './oil-operations.component';
import { OilOperationsAdjustmentComponent } from './components/oil-operations-adjustment/oil-operations-adjustment.component';
import { OilOperationsFilterComponent } from './components/oil-operations-filter/oil-operations-filter.component';
import { OilOperationsFreeShipmentComponent } from './components/oil-operations-free-shipment/oil-operations-free-shipment.component';
import { OilOperationsLineComponent } from './components/oil-operations-line/oil-operations-line.component';
import { OilOperationsLineChartComponent } from './components/oil-operations-line-chart/oil-operations-line-chart.component';
import { OilOperationsLineMenuComponent } from './components/oil-operations-line-menu/oil-operations-line-menu.component';
import { OilOperationsReceivedOperationsComponent } from './components/oil-operations-received-operations/oil-operations-received-operations.component';
import { OilOperationsShipmentFormationComponent } from './components/oil-operations-shipment-formation/oil-operations-shipment-formation.component';
import { OilOperationsTankFilterComponent } from './components/oil-operations-tank-filter/oil-operations-tank-filter.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from '../../../dashboard/pages/dashboard.component';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
      OilOperationsComponent,
      OilOperationsAdjustmentComponent,
      OilOperationsFilterComponent,
      OilOperationsFreeShipmentComponent,
      OilOperationsLineComponent,
      OilOperationsLineChartComponent,
      OilOperationsLineMenuComponent,
      OilOperationsReceivedOperationsComponent,
      OilOperationsShipmentFormationComponent,
      OilOperationsTankFilterComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatDatepickerModule,
        MatIconModule,
        NgxMatDatetimePickerModule,
        MatFormFieldModule,
        DashboardModule,
        ScrollingModule
    ],
    exports: [
        OilOperationsFilterComponent
    ]
})
export class OilOperationsModule {
    enterComponent = OilOperationsComponent;
}
