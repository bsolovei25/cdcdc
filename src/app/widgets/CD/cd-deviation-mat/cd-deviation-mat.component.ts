import { Component, Inject, OnDestroy, OnInit, Input } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IAPSRecipeDiagram,
    IColumnsToDisplay
} from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { DATASOURCE } from '../../APS/aps-recipe-diagram/mock';
import { SelectionModel } from '@angular/cdk/collections';
import { IStreams } from '../cd-mat-balance/cd-mat-balance.component';

@Component({
    selector: 'evj-cd-deviation-mat',
    templateUrl: './cd-deviation-mat.component.html',
    styleUrls: ['./cd-deviation-mat.component.scss']
})
export class CdDeviationMatComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IStreams[] = [];
    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Мат. поток', date: new Date() },
        { name: 'Факт', date: new Date('2020-02-01T03:24:00') },
        { name: 'Модель', date: new Date('2020-02-02T03:24:00') },
        { name: '∆', date: new Date('2020-02-03T03:24:00') }
    ];

    dataSourceQuality: IAPSRecipeDiagram[] = DATASOURCE;

    selectedRowProduct: string;
    selectedRow: SelectionModel<string> = new SelectionModel(true);

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = [
                ...ref?.streams,
                {
                    description: 'ББФ',
                    deviation: 0,
                    modelValue: 0,
                    name: 'last-row',
                    value: 8.846439278
                }
            ];
        }
    }

    onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element?.name !== this.selectedRowProduct) {
            this.selectedRowProduct = element?.name;
        } else {
            this.selectedRowProduct = null;
        }
    }
}
