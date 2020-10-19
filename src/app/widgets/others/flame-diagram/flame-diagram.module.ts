import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlameDiagramComponent } from './flame-diagram.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ FlameDiagramComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FlameDiagramModule {
  enterComponent = FlameDiagramComponent;
}
