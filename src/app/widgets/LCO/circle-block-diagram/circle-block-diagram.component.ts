import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBlockDiagram, IBlockDiagramMock } from 'src/app/dashboard/models/LCO/circle-block-diagram';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

@Component({
    selector: 'evj-circle-block-diagram',
    templateUrl: './circle-block-diagram.component.html',
    styleUrls: ['./circle-block-diagram.component.scss'],
})
export class CircleBlockDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {
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

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.blockDiagram.disabled = ref.disabled;
        this.blockDiagram.improvement = ref.improvement;
        this.blockDiagram.noReason = ref.noReason;
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
