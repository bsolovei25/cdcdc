import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCodingComponent } from './document-coding.component';
import { DocumentCodingFilterComponent } from './components/document-coding-filter/document-coding-filter.component';
import { DocumentCodingMenuComponent } from './components/document-coding-menu/document-coding-menu.component';
import { DocumentCodingTableComponent } from './components/document-coding-table/document-coding-table.component';
import { DocumentCodingTableRecordComponent } from './components/document-coding-table-record/document-coding-table-record.component';
import { DocumentCodingTanksComponent } from './components/document-coding-tanks/document-coding-tanks.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DocumentCodingComponent,
        DocumentCodingFilterComponent,
        DocumentCodingMenuComponent,
        DocumentCodingTableComponent,
        DocumentCodingTableRecordComponent,
        DocumentCodingTanksComponent
    ],
    exports: [
        DocumentCodingFilterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        DashboardModule,
        ScrollingModule,
        MatTooltipModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
    ]
})
export class DocumentCodingModule {
    enterComponent = DocumentCodingComponent;
}
