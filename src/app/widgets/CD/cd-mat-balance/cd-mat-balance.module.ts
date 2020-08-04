import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdMatBalanceComponent } from './cd-mat-balance.component';

@NgModule({
    declarations: [CdMatBalanceComponent],
    imports: [
        CommonModule
    ]
})
export class CdMatBalanceModule {
    enterComponent = CdMatBalanceComponent;
}
