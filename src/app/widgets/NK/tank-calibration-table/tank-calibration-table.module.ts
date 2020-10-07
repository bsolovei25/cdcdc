import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankCalibrationTableComponent } from './tank-calibration-table.component';
import { TanksTableComponent } from './tanks-table/tanks-table.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { TankCalibrationTableFilesComponent } from './tank-calibration-table-files/tank-calibration-table-files.component';
import { SharedModule } from '@shared/shared.module';
import { UploadDropComponent } from './upload-form/upload-drop/upload-drop.component';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [
    TankCalibrationTableComponent,
    TankCalibrationTableFilesComponent,
    TanksTableComponent,
    UploadFormComponent,
    UploadDropComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule
  ]
})
export class TankCalibrationTableModule {
  enterComponent = TankCalibrationTableComponent;
}
