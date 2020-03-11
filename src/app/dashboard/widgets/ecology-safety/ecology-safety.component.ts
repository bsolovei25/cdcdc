import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IEcologySafety } from '../../models/ecology-safety';
import { IWidgets } from '../../models/widget.model';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-ecology-safety',
    templateUrl: './ecology-safety.component.html',
    styleUrls: ['./ecology-safety.component.scss'],
})
export class EcologySafetyComponent extends WidgetPlatform implements OnInit, OnDestroy {

    protected static itemCols: number = 18;
    protected static itemRows: number = 2;

    /* Приблизительная структура, получаемая с бека */

    public data: IEcologySafety = {
        plan: 100, // план
        curValue: 80, // текущее значение
        maxValue: 120, // максимальное значение
    };

    public colorNormal: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    constructor(
        protected widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = 'индекс';
    }

    ngOnInit(): void {
        super.widgetInit();
        if (!this.isMock) {
            this.wsConnect();
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void { }

    wsConnect(): void {
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.id, 'ecology-safety')
                .subscribe((ref) => {
                    this.data = ref;
                    this.data.curValue = ref.currentValue;
                    console.log(this.data);
                })
        );
    }

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        return flag ? this.colorNormal : this.colorDeviation;
    }
}
