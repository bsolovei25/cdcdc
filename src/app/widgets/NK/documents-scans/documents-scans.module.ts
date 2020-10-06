import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsScansComponent } from './documents-scans.component';
import { SharedModule } from '@shared/shared.module';
import { DocumentsScansReportComponent } from './components/documents-scans-report/documents-scans-report.component';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@NgModule({
  declarations: [ DocumentsScansComponent, DocumentsScansReportComponent ],
  imports: [
    CommonModule,
    SharedModule
  ],
  bootstrap: [],
  providers: [
      { provide: LOCALE_ID, useValue: 'ru-RU' },
      { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class DocumentsScansModule {
  enterComponent = DocumentsScansComponent;
}
