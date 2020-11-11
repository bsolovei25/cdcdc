import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityDocsPanelComponent } from './quality-docs-panel.component';
import { SharedModule } from '@shared/shared.module';
import { QualityDocsRecordComponent } from './components/quality-docs-record/quality-docs-record.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DocumentCodingModule } from '../document-coding/document-coding.module';
import { DashboardModule } from '../../../dashboard/dashboard.module';



@NgModule({
  declarations: [ QualityDocsPanelComponent, QualityDocsRecordComponent ],
  imports: [
      CommonModule,
      SharedModule,
      AngularSvgIconModule,
      DocumentCodingModule,
      DashboardModule,
  ]
})
export class QualityDocsPanelModule {
    enterComponent = QualityDocsPanelComponent;
}
