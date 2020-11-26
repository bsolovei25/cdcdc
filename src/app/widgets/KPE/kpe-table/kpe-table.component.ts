import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IParams } from '../../CD/cd-mat-balance/cd-mat-balance.component';
import { SelectionModel } from '@angular/cdk/collections';
import { table, tableHeader } from './components/kpe-table-mock';

export interface IKpeTableHeader {
    name: string;
    id: string;
}
export interface IKpeTable {
    unit: { description?: string; name: string };
    parameters: IKpeTableBody[];
}
export interface IKpeTableBody {
    name: string;
    plan: number;
    average: number;
    instant: number;
    accumulation: number;
    percentPlan: string;
    predictPercent: number;
    deviationValue: number;
    deviationPercent: string;
    recommended: number;
    isDeviation?: number;
    isCritical?: number;
}
@Component({
  selector: 'evj-kpe-table',
  templateUrl: './kpe-table.component.html',
  styleUrls: ['./kpe-table.component.scss']
})
export class KpeTableComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IKpeTable[] = table;
    columnsToDisplay: IKpeTableHeader[] = tableHeader;

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

    protected dataHandler(ref: any): void {

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
