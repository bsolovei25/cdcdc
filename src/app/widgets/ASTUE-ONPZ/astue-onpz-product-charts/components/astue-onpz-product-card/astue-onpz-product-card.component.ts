import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';
import { IAstueProductChart } from '../../astue-onpz-product-charts.component';

@Component({
    selector: 'evj-astue-onpz-product-card',
    templateUrl: './astue-onpz-product-card.component.html',
    styleUrls: ['./astue-onpz-product-card.component.scss'],
})
export class AstueOnpzProductCardComponent implements OnChanges, OnInit {
    @Input() public data: IAstueProductChart;

    constructor() {}

    ngOnChanges(): void {
        this.data.graph.forEach((item) => {
            item.graph.forEach((val) => {
                val.timeStamp = new Date(val.timeStamp);
            });
        });
    }

    ngOnInit(): void {}
}
