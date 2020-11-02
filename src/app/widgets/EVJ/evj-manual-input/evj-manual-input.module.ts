import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { EvjManualInputComponent } from './evj-manual-input.component';
import { CommonModule } from '@angular/common';
import { EvjManualInputHistoryComponent } from './components/evj-manual-input-history.component';

@NgModule({
  declarations: [EvjManualInputComponent, EvjManualInputHistoryComponent],
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
