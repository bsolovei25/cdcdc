import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleDiagramComponent } from './circle-diagram.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ CircleDiagramComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CircleDiagramModule {
  enterComponent = CircleDiagramComponent;
}
