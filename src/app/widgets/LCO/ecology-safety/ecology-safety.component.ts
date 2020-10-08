import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IEcologySafety } from '../../../dashboard/models/ecology-safety';
import { IWidget } from '../../../dashboard/models/widget.model';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';

@Component({
    selector: 'evj-ecology-safety',
    templateUrl: './ecology-safety.component.html',
    styleUrls: ['./ecology-safety.component.scss'],
})
export class EcologySafetyComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public static itemCols: number = 24;
    public static itemRows: number = 5;
    public static minItemCols: number = 24;
    public static minItemRows: number = 5;

    /* Приблизительная структура, получаемая с бека */

    public data: IEcologySafety = {
        plan: 100, // план
        curValue: 80, // текущее значение
        maxValue: 120, // максимальное значение
    };

    public colorNormal: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = 'индекс';
        this.widgetIcon = 'eco-shield';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
        this.data.curValue = ref.currentValue;
    }

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        return flag ? this.colorNormal : this.colorDeviation;
    }
}
