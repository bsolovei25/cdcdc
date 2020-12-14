import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeExecutionProductionProgramComponent } from './kpe-execution-production-program.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from 'ng2-ckeditor';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { KpeExecutionProductionProgramAddPlanComponent } from './components/kpe-execution-production-program-add-plan/kpe-execution-production-program-add-plan.component';
import { KpeExecutionProductionProgramEditPlaneComponent } from './components/kpe-execution-production-program-edit-plane/kpe-execution-production-program-edit-plane.component';
import { KpeExecutionProductionProgramLoadingFileComponent } from './components/kpe-execution-production-program-loading-file/kpe-execution-production-program-loading-file.component';



@NgModule({
    declarations: [KpeExecutionProductionProgramComponent, KpeExecutionProductionProgramAddPlanComponent, KpeExecutionProductionProgramEditPlaneComponent, KpeExecutionProductionProgramLoadingFileComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatRippleModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        CKEditorModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule

    ]
})
export class KpeExecutionProductionProgramModule {
    enterComponent = KpeExecutionProductionProgramComponent;
}
