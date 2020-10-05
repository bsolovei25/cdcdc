import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcologySafetyComponent } from './ecology-safety.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [EcologySafetyComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class EcologySafetyModule {
    enterComponent = EcologySafetyComponent;
}
