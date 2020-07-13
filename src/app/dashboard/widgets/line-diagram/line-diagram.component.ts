import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { ILineDiagram, ILineDiagramData, ILineDiagramDataItem } from '../../models/line-diagram';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-line-diagram',
    templateUrl: './line-diagram.component.html',
    styleUrls: ['./line-diagram.component.scss'],
})
export class LineDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 22;
    public static itemRows: number = 6;
    public static minItemCols: number = 12;
    public static minItemRows: number = 6;

    public data: ILineDiagram[] = [
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
    public fillGraphs: string = '#3FA9F5';

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: ILineDiagramData): void {
        this.data = ref.items.map((el: ILineDiagramDataItem) => ({
            name: el.name,
            count: el.percentage,
            curValue: el.value,
            planValue: el.upperBound,
            units: el.units,
            critical: el.isCritical,
        }));
    }

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        const normalFill = '#3FA9F5';
        const criticalFill = '#F4A321';
        return flag ? criticalFill : normalFill;
    }
}
