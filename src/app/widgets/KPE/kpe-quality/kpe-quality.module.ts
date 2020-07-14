import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityComponent } from './kpe-quality.component';

@NgModule({
  declarations: [KpeQualityComponent],
  imports: [CommonModule],
})
export class KpeQualityModule {
  enterComponent = KpeQualityComponent;
}
