import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { EvjManualInputComponent } from './evj-manual-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EvjManualInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    HttpClientModule,
    FormsModule
  ],
  providers: []
})

export class EvjManualInputModule {
  enterComponent = EvjManualInputComponent;
}
