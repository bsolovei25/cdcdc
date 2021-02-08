import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatedDiagramCounterItemComponent } from './truncated-diagram-counter-item/truncated-diagram-counter-item.component';
import { TruncatedDiagramCounterComponent } from './truncated-diagram-counter.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [TruncatedDiagramCounterItemComponent, TruncatedDiagramCounterComponent],
    imports: [CommonModule, SharedModule],
})
export class TruncatedDiagramCounterModule {
    enterComponent = TruncatedDiagramCounterComponent;
}
