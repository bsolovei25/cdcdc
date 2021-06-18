import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KpeAccuracyTimelinesDataComponent } from "./kpe-accuracy-timelines-data.component";
import { SharedModule } from "@shared/shared.module";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CKEditorModule } from "ng2-ckeditor";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { KpeAccuracyTimelinesDataAddPlanComponent } from './components/kpe-accuracy-timelines-data-add-plan/kpe-accuracy-timelines-data-add-plan.component';
import { KpeAccuracyTimelinesDataEditPlanComponent } from './components/kpe-accuracy-timelines-data-edit-plan/kpe-accuracy-timelines-data-edit-plan.component';
import { KpeAccuracyTimelinesDataLoadingFileComponent } from './components/kpe-accuracy-timelines-data-loading-file/kpe-accuracy-timelines-data-loading-file.component';
import { KpeAccuracyTimelinesCardComponent } from './components/kpe-accuracy-timelines-card/kpe-accuracy-timelines-card.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';

@NgModule({
    declarations: [KpeAccuracyTimelinesDataComponent, KpeAccuracyTimelinesDataAddPlanComponent, KpeAccuracyTimelinesDataEditPlanComponent, KpeAccuracyTimelinesDataLoadingFileComponent, KpeAccuracyTimelinesCardComponent],
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
        MatTooltipModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
        KpeSharedModule
    ]
})
export class KpeAccuracyTimelinesDataModule {
    enterComponent = KpeAccuracyTimelinesDataComponent;
}
