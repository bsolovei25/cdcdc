import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IAPSRecipeDiagram, IAPSRecipeDiagramValue,
    IColumnsToDisplay
} from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DATASOURCE } from '../../APS/aps-recipe-diagram/mock';

@Component({
    selector: 'evj-cd-reactor-parameters',
    templateUrl: './cd-reactor-parameters.component.html',
    styleUrls: ['./cd-reactor-parameters.component.scss']
})
export class CdReactorParametersComponent extends WidgetPlatform implements OnInit, OnDestroy {

    dataSourceQuality: IAPSRecipeDiagram[] = DATASOURCE;
    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Параметры', date: new Date() },
        { name: 'Факт', date: new Date('2020-02-01T03:24:00') },
        { name: 'Модель', date: new Date('2020-02-02T03:24:00') }
    ];

    expandedElement: SelectionModel<number> = new SelectionModel(true);
    selectedRowProduct: number;
    selectedRow: SelectionModel<string> = new SelectionModel(true);

    constructor(public widgetService: WidgetService,
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

    onClickTr(
        event: MouseEvent,
        element: IAPSRecipeDiagram
    ): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.id)) {
            this.expandedElement.deselect(element.id);
        } else {
            this.expandedElement.select(element.id);
        }
    }

    onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.id !== this.selectedRowProduct) {
            this.selectedRowProduct = element.id;
        } else {
            this.selectedRowProduct = null;
        }
    }

    searchValue(element: IAPSRecipeDiagramValue[], column: IColumnsToDisplay):
        { value: number, percentValue: number }[] {
        const el = element.find(value => this.sameDay(value.date, column.date));
        return el?.value ? [{
            value: el?.value, percentValue: el?.percent
        }] : null;
    }

    sameDay(a: Date, d: Date): boolean {
        return a.getFullYear() === d.getFullYear()
            && a.getDate() === d.getDate()
            && a.getMonth() === d.getMonth();
    }

}
