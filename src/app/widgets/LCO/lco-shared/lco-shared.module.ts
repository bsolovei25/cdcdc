import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DetailedLineDiagramComponent } from './detailed-line-diagram/detailed-line-diagram.component';



@NgModule({
  declarations: [ DetailedLineDiagramComponent ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule
  ],
  exports: [
    DetailedLineDiagramComponent
  ]  
})
export class LcoSharedModule { }
