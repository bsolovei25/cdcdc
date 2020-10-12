import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleBlockDiagramComponent } from './circle-block-diagram.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ CircleBlockDiagramComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CircleBlockDiagramModule {
  enterComponent = CircleBlockDiagramComponent;
}
