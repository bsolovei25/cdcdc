import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IAPSRecipeDiagram,
    IAPSRecipeDiagramValue,
    IColumnsToDisplay
} from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DATASOURCE } from '../../APS/aps-recipe-diagram/mock';
import { IParams } from '../../CD/cd-mat-balance/cd-mat-balance.component';

@Component({
  selector: 'evj-astue-onpz-heat-balance',
  templateUrl: './astue-onpz-heat-balance.component.html',
  styleUrls: ['./astue-onpz-heat-balance.component.scss']
})
export class AstueOnpzHeatBalanceComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    dataSourceQuality: IAPSRecipeDiagram[] = DATASOURCE;
    data: IParams[] = [];
    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Параметры', date: new Date() },
        { name: 'Факт', date: new Date('2020-02-01T03:24:00') },
        { name: 'Модель', date: new Date('2020-02-02T03:24:00') }
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

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            console.log(ref.params);
            this.data = [
                ...ref.params,
                {
                    unit: {
                        name: 'last-row',
                        description: 'last-row'
                    }
                }
            ];
        }
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

    searchValue(element: IAPSRecipeDiagramValue[], column: IColumnsToDisplay) {
        // const el = element.find((value) => this.sameDay(value.date, column.date));
        // return el?.value
        //     ? [
        //           {
        //               value: el?.value,
        //               percentValue: el?.percent,
        //           },
        //       ]
        //     : null;
    }

    sameDay(a: Date, d: Date): boolean {
        return (
            a.getFullYear() === d.getFullYear() &&
            a.getDate() === d.getDate() &&
            a.getMonth() === d.getMonth()
        );
    }
}

