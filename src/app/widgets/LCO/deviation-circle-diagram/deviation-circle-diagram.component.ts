import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { DeviationCircleDiagram, ICenterOfPoint } from '../../../dashboard/models/LCO/deviation-circle-diagram';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-deviation-circle-diagram',
    templateUrl: './deviation-circle-diagram.component.html',
    styleUrls: ['./deviation-circle-diagram.component.scss'],
})
export class DeviationCircleDiagramComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public deviationCircleDiagram: DeviationCircleDiagram = {
        deviation: 0, // отклонение в %
        improvement: 0, // улучшение в %
        maxValue: 0,
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

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.widgetUnits = '%';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: DeviationCircleDiagram): void {
        this.copyAbsoluteData(ref);
    }

    copyAbsoluteData(data: DeviationCircleDiagram): void {
        for (const prop of Object.keys(data)) {
            let value: number;
            if (data[prop] % 1 !== 0) {
                value = Number(data[prop]);
                value = +value.toFixed(2);
            } else {
                value = data[prop];
            }
            this.deviationCircleDiagram[prop] = Math.abs(value);
        }
    }

    /* Отрисовка дуговых диаграмм */

    diaLine(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const percent: number = line / 100 < 1 ? line / 100 : 1;
        return percent * c + ' ' + (c - percent * c);
    }

    diaOffset(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        return (-0.75 * c).toString();
    }

    diaLinePoint(line: number, isOuter: boolean): ICenterOfPoint {
        const percent: number = line / 100;
        const t = percent < 1 ? 2 * Math.PI * percent - Math.PI / 2 : (3 / 2) * Math.PI;
        const r = isOuter ? +this.radius + 3 : +this.radius - 3;
        const centerOfPoint: ICenterOfPoint = {
            xCen: (r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString(),
        };
        return centerOfPoint;
    }
}
