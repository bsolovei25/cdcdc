import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IAPSRecipeDiagram,
    IColumnsToDisplay
} from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { DATASOURCE } from '../../APS/aps-recipe-diagram/mock';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-cd-deviation-mat',
    templateUrl: './cd-deviation-mat.component.html',
    styleUrls: ['./cd-deviation-mat.component.scss']
})
export class CdDeviationMatComponent extends WidgetPlatform implements OnInit, OnDestroy {

    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Мат. поток', date: new Date() },
        { name: 'Факт', date: new Date('2020-02-01T03:24:00') },
        { name: 'Модель', date: new Date('2020-02-02T03:24:00') },
        { name: '∆', date: new Date('2020-02-03T03:24:00') }
    ];

    dataSourceQuality: IAPSRecipeDiagram[] = DATASOURCE;

    selectedRowProduct: number;
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

    protected dataHandler(
        ref: any
    ): void {
    }

    onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.id !== this.selectedRowProduct) {
            this.selectedRowProduct = element.id;
        } else {
            this.selectedRowProduct = null;
        }
    }


}
