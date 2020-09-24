import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjcoOnpzFrameTopComponent } from './ejco-onpz-frame-top/ejco-onpz-frame-top.component';
import { EjcoOnpzFrameBottomComponent } from './ejco-onpz-frame-bottom/ejco-onpz-frame-bottom.component';
import { EjcoGaugeChartComponent } from './ejco-gauge-chart/ejco-gauge-chart.component';
import { EjcoOnpzHelperService } from './ejco-onpz-helper.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        EjcoOnpzFrameTopComponent,
        EjcoOnpzFrameBottomComponent,
        EjcoGaugeChartComponent,
    ],
    exports: [
        EjcoOnpzFrameTopComponent,
        EjcoOnpzFrameBottomComponent,
        EjcoGaugeChartComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    providers: [
        EjcoOnpzHelperService,
    ]
})
export class EjcoOnpzSharedModule {
}
