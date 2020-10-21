import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdCriticalComponent } from './cd-critical.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ CdCriticalComponent ],
  imports: [
    CommonModule,
      SharedModule
  ]
})
export class CdCriticalModule {
    enterComponent = CdCriticalComponent;
}
