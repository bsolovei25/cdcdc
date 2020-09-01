import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

interface IPredictors {
    name: string;
    label: string;
    color: number;
    isActive?: boolean;
}

@Component({
    selector: 'evj-astue-onpz-predictors',
    templateUrl: './astue-onpz-predictors.component.html',
    styleUrls: ['./astue-onpz-predictors.component.scss']
})
export class AstueOnpzPredictorsComponent extends WidgetPlatform implements OnInit, OnDestroy {

    data: IPredictors[] = [
        {
            name: 'Скорость ветра',
            label: 'Meteo:SP',
            color: 1,
            isActive: true
        },
        {
            name: 'Газ из Е-2 (FI103 пл лаб)',
            label: 'AVT10:PL103_O',
            color: 2,
            isActive: true
        },
        {
            name: 'Температура канала 1',
            label: 'AVT10:PL103_O',
            color: 3,
            isActive: false
        },
        {
            name: 'Скорость ветра',
            label: 'Meteo:SP',
            color: 3,
            isActive: true
        },
        {
            name: 'Газ из Е-2 (FI103 пл лаб)',
            label: 'AVT10:PL103_O',
            color: 4,
            isActive: true
        }
    ];

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

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }

}
