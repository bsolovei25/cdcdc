import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CustomReportOptionsComponent } from './custom-report-options/custom-report-options.component';
import { CustomReportPropertiesReferenceComponent } from './custom-report-properties-reference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ CustomReportPropertiesReferenceComponent, CustomReportOptionsComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AngularSvgIconModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule,
        ReactiveFormsModule
    ]
})
export class CustomReportPropertiesReferenceModule {
    enterComponent = CustomReportPropertiesReferenceComponent;
}
