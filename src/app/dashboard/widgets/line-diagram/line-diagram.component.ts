import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { inject } from '@angular/core/testing';

@Component({
    selector: 'evj-line-diagram',
    templateUrl: './line-diagram.component.html',
    styleUrls: ['./line-diagram.component.scss'],
})
export class LineDiagramComponent implements OnInit {
    static itemCols = 15;
    static itemRows = 7;

    private subscription: Subscription;

    data = [
        {
            name: 'Сухой газ',
            count: 97,
            curValue: 97,
            planValue: 100,
            units: '%',
            critical: false,
        },
        {
            name: 'Пропан',
            count: 73,
            curValue: 73,
            planValue: 100,
            units: '%',
            critical: true,
        },
    ];
    fillGraphs = '#3FA9F5';

    public title: string;
    public units: string;
    public previewTitle: string;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(id).subscribe((data) => {
            this.title = data.title;
            this.units = data.units;
            this.previewTitle = data.widgetType;
        });
    }

    ngOnInit() {
        this.showMock(this.isMock);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        const normalFill = '#3FA9F5';
        const criticalFill = '#F4A321';
        return flag ? criticalFill : normalFill;
    }

    showMock(show) {
        if (!show) {
            this.wsConnect();
        }
    }

    wsConnect() {
        this.subscription = this.widgetService
            .getWidgetLiveDataFromWS(this.id, 'line-diagram')
            .subscribe((data) => {
                this.data = data.items.map((el) => ({
                    name: el.name,
                    count: el.percentage,
                    curValue: el.value,
                    planValue: el.upperBound,
                    units: el.units,
                    critical: el.isCritical,
                }));
            });
    }

    wsDisconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
