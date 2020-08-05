import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdLineChartComponent } from './cd-line-chart/cd-line-chart.component';
import { CdMnemonicComponent } from './cd-mnemonic/cd-mnemonic.component';


@NgModule({
    declarations: [CdLineChartComponent, CdMnemonicComponent],
    exports: [CdLineChartComponent, CdMnemonicComponent],
    imports: [
        CommonModule
    ]
})
export class CDSharedModule {
}
