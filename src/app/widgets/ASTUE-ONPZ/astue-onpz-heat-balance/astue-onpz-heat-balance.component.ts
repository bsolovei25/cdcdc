import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IColumnsToDisplay } from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';
import { IParams } from '../../CD/cd-mat-balance/cd-mat-balance.component';
import { heatBalanceData } from './astue-onpz-heat-balance-mock';
import { IAstueOnpzHeatBalanceItem } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-heat-balance.model';

@Component({
    selector: 'evj-astue-onpz-heat-balance',
    templateUrl: './astue-onpz-heat-balance.component.html',
    styleUrls: ['./astue-onpz-heat-balance.component.scss'],
})
export class AstueOnpzHeatBalanceComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    data: IAstueOnpzHeatBalanceItem[] = heatBalanceData;
    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Показатели, Дж', id: 0, date: new Date() },
        { name: 'Абсолютная величина', id: 1, date: new Date('2020-02-01T03:24:00') },
        { name: 'Относительная величина', id: 2, date: new Date('2020-02-02T03:24:00') },
    ];

    expandedElement: SelectionModel<string> = new SelectionModel(true);
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

    protected dataHandler(ref: { item: IAstueOnpzHeatBalanceItem[] }): void {
        this.data = [...ref.item];
    }

    deviationCount(element: IParams): number {
        let i = 0;
        element.unitParams.forEach((value) => (value.deviation > 0 ? (i += 1) : (i += 0)));
        return i;
    }

    onClickTr(event: MouseEvent, element: any): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.name !== this.selectedRowProduct) {
            this.selectedRowProduct = element.name;
        } else {
            this.selectedRowProduct = null;
        }
    }
}
