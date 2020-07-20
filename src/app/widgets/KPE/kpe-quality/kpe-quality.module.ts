import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityComponent } from './kpe-quality.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';

@NgModule({
  declarations: [KpeQualityComponent],
  imports: [CommonModule, KpeSharedModule],
})
export class KpeQualityModule {
  enterComponent = KpeQualityComponent;
}
