import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatedDiagramPercentageComponent } from './truncated-diagram-percentage.component';
import { TruncatedDiagramPercentageItemComponent } from './truncated-diagram-percentage-item/truncated-diagram-percentage-item.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [TruncatedDiagramPercentageComponent, TruncatedDiagramPercentageItemComponent],
    imports: [CommonModule, SharedModule],
})
export class TruncatedDiagramPercentageModule {
    enterComponent = TruncatedDiagramPercentageComponent;
}
