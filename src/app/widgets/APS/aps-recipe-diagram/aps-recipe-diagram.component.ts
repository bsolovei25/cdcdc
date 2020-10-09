import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { DATASOURCE } from './mock';
import { SelectionModel } from '@angular/cdk/collections';

export interface IAPSRecipeDiagram {
    id: number;
    codePims: string;
    productName: string;
    productDeviation: number;
    deviationQuality: number;
    type: 'stream' | 'unit' | 'to' | 'fuel' | 'utility';
    percent?: number;
    children: IAPSRecipeDiagram[];
    values: IAPSRecipeDiagramValue[];
}

export interface IAPSRecipeDiagramValue {
    date: Date;
    value: number;
    deviationQuality: number;
    percent?: number;
}

export interface IColumnsToDisplay {
    date: Date;
    name: string;
}

@Component({
    selector: 'evj-aps-recipe-diagram',
    templateUrl: './aps-recipe-diagram.component.html',
    styleUrls: ['./aps-recipe-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApsRecipeDiagramComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    dataSource: IAPSRecipeDiagram[] = DATASOURCE;

    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'productName', date: new Date() },
        { name: '1.02', date: new Date('2020-02-01T03:24:00') },
        { name: '2.02', date: new Date('2020-02-02T03:24:00') },
        { name: '3.02', date: new Date('2020-02-03T03:24:00') },
        { name: '4.02', date: new Date('2020-02-04T03:24:00') },
        { name: '5.02', date: new Date('2020-02-05T03:24:00') },
        { name: '6.02', date: new Date('2020-02-06T03:24:00') },
        { name: '7.02', date: new Date('2020-02-07T03:24:00') },
        { name: '8.02', date: new Date('2020-02-08T03:24:00') },
        { name: '9.02', date: new Date('2020-02-09T03:24:00') },
        { name: '10.02', date: new Date('2020-02-10T03:24:00') },
        { name: '11.02', date: new Date('2020-02-11T03:24:00') },
        { name: '12.02', date: new Date('2020-02-12T03:24:00') },
        { name: '13.02', date: new Date('2020-02-13T03:24:00') },
        { name: '14.02', date: new Date('2020-02-14T03:24:00') },
        { name: '15.02', date: new Date('2020-02-15T03:24:00') },
        { name: '16.02', date: new Date('2020-02-16T03:24:00') },
        { name: '17.02', date: new Date('2020-02-17T03:24:00') },
        { name: '18.02', date: new Date('2020-02-18T03:24:00') },
        { name: '19.02', date: new Date('2020-02-19T03:24:00') },
        { name: '20.02', date: new Date('2020-02-20T03:24:00') },
        { name: '21.02', date: new Date('2020-02-21T03:24:00') },
        { name: '22.02', date: new Date('2020-02-22T03:24:00') },
        { name: '23.02', date: new Date('2020-02-23T03:24:00') },
        { name: '24.02', date: new Date('2020-02-24T03:24:00') },
        { name: '25.02', date: new Date('2020-02-25T03:24:00') },
        { name: '26.02', date: new Date('2020-02-26T03:24:00') },
        { name: '27.02', date: new Date('2020-02-27T03:24:00') },
        { name: 'План PIMS', date: new Date('2020-02-01T03:24:00') },
        { name: 'Расчет', date: new Date('2020-02-01T03:24:00') },
        { name: 'Дельта', date: new Date('2020-02-01T03:24:00') }];

    isSelectedQuality: boolean = false;
    selectedRowProduct: number;
    isShowDistribution: boolean = false;
    isShowUtility: boolean = false;
    selectedRow: SelectionModel<string> = new SelectionModel(true);

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

    onClickTr(
        event: MouseEvent,
        element: IAPSRecipeDiagram
    ): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.id !== this.selectedRowProduct) {
            this.selectedRowProduct = element.id;
        } else {
            this.selectedRowProduct = null;
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
