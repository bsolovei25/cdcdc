import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DocumentViewerComponent } from './document-viewer.component';
import { DocumentViewerFullscreenComponent } from './document-viewer-fullscreen/document-viewer-fullscreen.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [ DocumentViewerComponent, DocumentViewerFullscreenComponent ],
  imports: [
    CommonModule,
    SharedModule,
    PdfViewerModule,
    AngularSvgIconModule
  ]
})
export class DocumentViewerModule {
  enterComponent = DocumentViewerComponent;
}
