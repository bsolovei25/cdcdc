import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

interface IPredictors {
    id: number;
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
            id: 1,
            name: 'Скорость ветра',
            label: 'Meteo:SP',
            color: 1,
            isActive: true
        },
        {
            id: 2,
            name: 'Газ из Е-2 (FI103 пл лаб)',
            label: 'AVT10:PL103_O',
            color: 2,
            isActive: true
        },
        {
            id: 3,
            name: 'Температура канала 1',
            label: 'AVT10:PL103_O',
            color: 3,
            isActive: false
        },
        {
            id: 4,
            name: 'Скорость ветра',
            label: 'Meteo:SP',
            color: 3,
            isActive: true
        },
        {
            id: 5,
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

    protected dataHandler(ref: {predictors: IPredictors[] }): void {
        this.data = ref.predictors;
    }

}
