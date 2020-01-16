import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-circle-block-diagram',
    templateUrl: './circle-block-diagram.component.html',
    styleUrls: ['./circle-block-diagram.component.scss'],
})
export class CircleBlockDiagramComponent implements OnInit {
    blockDiagram = {
        improvement: 0, // улучшение в %
        disabled: 0, // отключенные блокировки в %
        noReason: 0, // не указана причина снятия блокировок в %
    };

    isMockData = {
        improvement: 87.7, // улучшение в %
    };

    /* Цвета для диаграмм */

    colorMain = '#1b1e27';
    colorBg = '#0d1014';
    colorNormal = '#a2e2ff';
    colorFull = '#FFFFFF';
    colorDeviation = '#F4A321';

    colorContour = '#5b607d';

    /* Координаты центров окружностей */

    centerX = '25';
    centerY = '25';

    radius = '12';

    subscription: Subscription;

    public title;
    public units = '%';
    public widgetType = 'circle-block-diagram';

    static itemCols = 15;
    static itemRows = 17;

    public previewTitle: string;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
            // this.code = data.code;
            // this.units = data.units;
            // this.name = data.name;
        });
    }

    ngOnInit() {
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

    /* Отрисовка дуговых диаграмм */

    diaLine(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const per_cent = line / 100;
        return per_cent * c + ' ' + (c - per_cent * c);
    }

    diaOffset(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const per_cent = line / 100;
        return (-0.75 * c).toString();
    }
}
