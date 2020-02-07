import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import {
    IBlockDiagram,
    IBlockDiagramMock,
} from '../../models/circle-block-diagram';

@Component({
    selector: 'evj-circle-block-diagram',
    templateUrl: './circle-block-diagram.component.html',
    styleUrls: ['./circle-block-diagram.component.scss'],
})
export class CircleBlockDiagramComponent implements OnInit {
    public blockDiagram: IBlockDiagram = {
        improvement: 0, // улучшение в %
        disabled: 0, // отключенные блокировки в %
        noReason: 0, // не указана причина снятия блокировок в %
    };

    public isMockData: IBlockDiagramMock = {
        improvement: 87.7, // улучшение в %
    };

    /* Цвета для диаграмм */

    public colorMain: string = '#1b1e27';
    public colorBg: string = '#0d1014';
    public colorNormal: string = '#a2e2ff';
    public colorFull: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    public colorContour: string = '#5b607d';

    /* Координаты центров окружностей */

    public centerX: string = '25';
    public centerY: string = '25';

    public radius: string = '12';

    public subscription: Subscription;

    public title: string;
    public units: string = '%';
    public widgetType: string = 'circle-block-diagram';

    static itemCols: number = 15;
    static itemRows: number = 17;

    public previewTitle: string;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService
            .getWidgetChannel(this.id)
            .subscribe((data) => {
                this.title = data.title;
                this.previewTitle = data.widgetType;
                // this.code = data.code;
                // this.units = data.units;
                // this.name = data.name;
            });
    }

    ngOnInit(): void {
        if (!this.isMock) {
            this.widgetService
                .getWidgetLiveDataFromWS(this.id, this.widgetType)
                .subscribe((data) => {
                    this.blockDiagram.disabled = data.disabled;
                    this.blockDiagram.improvement = data.improvement;
                    this.blockDiagram.noReason = data.noReason;
                });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
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
}
