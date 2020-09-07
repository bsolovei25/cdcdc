import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IPlanningChart } from '../../astue-onpz-planning-charts.component';

@Component({
    selector: 'evj-astue-onpz-planning-card',
    templateUrl: './astue-onpz-planning-card.component.html',
    styleUrls: ['./astue-onpz-planning-card.component.scss'],
})
export class AstueOnpzPlanningCardComponent implements OnChanges, OnInit {
    @Input() public data: IPlanningChart;

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
