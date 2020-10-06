import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsScansComponent } from './documents-scans.component';
import { SharedModule } from '@shared/shared.module';
import { DocumentsScansReportComponent } from './components/documents-scans-report/documents-scans-report.component';



@NgModule({
  declarations: [ DocumentsScansComponent, DocumentsScansReportComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DocumentsScansModule {
  enterComponent = DocumentsScansComponent;
}
