import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-column-chart-stacked',
    templateUrl: './column-chart-stacked.component.html',
    styleUrls: ['./column-chart-stacked.component.scss'],
})
export class ColumnChartStackedComponent implements OnInit {
    public icon: string = 'columns';

    cols = [
        {
            plan: 7,
            fact: 4,
            iconId: 1,
            max: 0,
        },
        {
            plan: 15,
            fact: 13,
            iconId: 2,
            max: 0,
        },
        {
            plan: 25,
            fact: 12,
            iconId: 3,
            max: 0,
        },
        {
            plan: 4,
            fact: 2,
            iconId: 4,
            max: 0,
        },
        {
            plan: 32,
            fact: 23,
            max: 0,
        },
        {
            plan: 18,
            fact: 18,
            iconId: 5,
            max: 0,
        },
        {
            plan: 0,
            fact: 0,
            iconId: 6,
            max: 0,
        },
        {
            plan: 13,
            fact: 6,
            iconId: 7,
            max: 0,
        },
        {
            plan: 1,
            fact: 0,
            iconId: 8,
            max: 0,
        },
        {
            plan: 7,
            fact: 7,
            iconId: 9,
            max: 0,
        },
        {
            plan: 19,
            fact: 16,
            iconId: 10,
            max: 0,
        },
    ];

    public title;
    public units = 'шт';

    subscription: Subscription;

    static itemCols = 26;
    static itemRows = 20;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            // this.code = data.code;
            // this.units = data.units;
            // this.name = data.name;
        });
    }

    ngOnInit() {
        this.findMax();
    }

    findMax() {
        let max = 0;
        for (let col of this.cols) {
            max = col.plan > max ? col.plan : max;
        }
        this.cols.forEach((item) => (item.max = max));
    }
}
