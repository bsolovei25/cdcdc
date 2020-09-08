import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';
import { IAstueProductChart } from '../../astue-onpz-product-charts.component';
import { UserSettingsService } from '../../../../../dashboard/services/user-settings.service';
import { AstueOnpzService } from '../../../astue-onpz-shared/astue-onpz.service';

@Component({
    selector: 'evj-astue-onpz-product-card',
    templateUrl: './astue-onpz-product-card.component.html',
    styleUrls: ['./astue-onpz-product-card.component.scss']
})
export class AstueOnpzProductCardComponent implements OnChanges, OnInit {
    @Input() public data: IAstueProductChart;

    constructor(
        private userSettingsService: UserSettingsService,
        private astueOnpzSerivice: AstueOnpzService,
    ) {
    }

    ngOnChanges(): void {
        this.data?.graphs?.forEach((item) => {
            item?.graph?.forEach((val) => {
                val.timeStamp = new Date(val.timeStamp);
            });
        });
    }

    ngOnInit(): void {
    }

    public switchToIndicatorScreen(): void {
        this.astueOnpzSerivice.updateGraphId(this.data.itemId);
        this.userSettingsService.LoadScreenByWidget('astue-onpz-interactive-indicators');
    }
}
