import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PetroleumProductsMovementComponent } from './petroleum-products-movement.component';
import { FilterPopupComponent } from './components/filter-popup/filter-popup.component';
import { TransferTableComponent } from './components/transfer-table/transfer-table.component';
import { PetroleumReferenceComponent } from './petroleum-reference/petroleum-reference.component';
import { InfoScreenComponent } from './petroleum-reference/info-screen/info-screen.component';
import { OperationParkScreenComponent } from './petroleum-reference/operation-park-screen/operation-park-screen.component';
import { OperationScreenComponent } from './petroleum-reference/operation-screen/operation-screen.component';
import { PetroleumReferenceLeftComponent } from './petroleum-reference-left/petroleum-reference-left.component';
import { InfoScreenLeftComponent } from './petroleum-reference-left/info-screen-left/info-screen-left.component';
import { OperationParkScreenLeftComponent } from './petroleum-reference-left/operation-park-screen-left/operation-park-screen-left.component';
import { OperationScreenLeftComponent } from './petroleum-reference-left/operation-screen-left/operation-screen-left.component';
import { PetroleumReferenceRightComponent } from './petroleum-reference-right/petroleum-reference-right.component';
import { InfoScreenRightComponent } from './petroleum-reference-right/info-screen-right/info-screen-right.component';
import { OperationScreenRightComponent } from './petroleum-reference-right/operation-screen-right/operation-screen-right.component';
import { OperationParkScreenRightComponent } from './petroleum-reference-right/operation-park-screen-right/operation-park-screen-right.component';
import { PetroleumUnityComponent } from './petroleum-unity/petroleum-unity.component';
import { PetroleumUnityInfoComponent } from './petroleum-unity-info/petroleum-unity-info.component';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { MatChip, MatChipInput, MatChipList, MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    PetroleumProductsMovementComponent,
    FilterPopupComponent,
    TransferTableComponent,
    PetroleumReferenceComponent,
    InfoScreenComponent,
    OperationParkScreenComponent,
    OperationScreenComponent,
    PetroleumReferenceLeftComponent,
    InfoScreenLeftComponent,
    OperationParkScreenLeftComponent,
    OperationScreenLeftComponent,
    PetroleumReferenceRightComponent,
    InfoScreenRightComponent,
    OperationScreenRightComponent,
    OperationParkScreenRightComponent,
    PetroleumUnityComponent,
    PetroleumUnityInfoComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    FormsModule,
    MatIconModule,
    OverlayModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
  ]
})
export class PetroleumProductsMovementModule {
  enterComponent = PetroleumProductsMovementComponent;
}
