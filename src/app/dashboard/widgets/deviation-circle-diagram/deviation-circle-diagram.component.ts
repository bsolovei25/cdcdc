import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { DeviationCircleDiagram, ICenterOfPoint } from '../../models/deviation-circle-diagram';

@Component({
    selector: 'evj-deviation-circle-diagram',
    templateUrl: './deviation-circle-diagram.component.html',
    styleUrls: ['./deviation-circle-diagram.component.scss'],
})
export class DeviationCircleDiagramComponent implements OnInit, OnDestroy {
    public deviationCircleDiagram: DeviationCircleDiagram = {
        deviation: 0, // отклонение в %
        improvement: 0, // улучшение в %
        maxValue: 0,
    };

    public isMockData: DeviationCircleDiagram = {
        deviation: 60, // отклонение в %
        improvement: 45, // улучшение в %
        maxValue: 80,
    };

    /* Цвета для диаграмм */

    public colorMain: string = '#1b1e27';
    public colorBg: string = '#0d1014';
    public colorNormal: string = '#a2e2ff';
    public colorFull: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    /* Координаты центров окружностей */

    public centerX: string = '25';
    public centerY: string = '25';

    public radius: string = '19';
    public radPoint: string = '0.8';

    public title: string;
    public units: string = '%';
    public previewTitle: string = 'deviation-circle-diagram';

    subscriptions: Subscription[] = [];

    static itemCols: number = 10;
    static itemRows: number = 8;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                this.previewTitle = data.widgetType;
                // this.code = data.code;
                // this.units = data.units;
                // this.name = data.name;
            })
        );
    }

    ngOnInit(): void {
        if (!this.isMock) {
            this.subscriptions.push(
                this.widgetService
                    .getWidgetLiveDataFromWS(this.id, this.previewTitle)
                    .subscribe((data: DeviationCircleDiagram) => {
                        this.deviationCircleDiagram = data;
                    })
            );
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        }
    }

    /* Отрисовка дуговых диаграмм */

    diaLine(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const percent = line / 100;
        return percent * c + ' ' + (c - percent * c);
    }

    diaOffset(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        return (-0.75 * c).toString();
    }

    diaLinePoint(line: number, isOuter: boolean): ICenterOfPoint {
        const percent = line / 100;
        const t = percent < 1 ? 2 * Math.PI * percent - Math.PI / 2 : (3 / 2) * Math.PI;
        const r = isOuter ? +this.radius + 3 : +this.radius - 3;
        const centerOfPoint: ICenterOfPoint = {
            xCen: (r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString(),
        };
        return centerOfPoint;
    }
}
