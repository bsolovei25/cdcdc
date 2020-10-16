import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';

export interface ISuspenseMachine {
    date: Date;
    production: string;
    equipment: string;
    suspenseBreakpoint: string;
    suspenseDuration: number;
    suspenseCause: string;
    suspenseRelated: string;
}

export interface ITableData {
    columns: { id: number; caption: string }[];
    values: { columnId: number; value: string }[][];
}

@Component({
    selector: 'evj-suspense-machine',
    templateUrl: './suspense-machine.component.html',
    styleUrls: ['./suspense-machine.component.scss'],
})
export class SuspenseMachineComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: ITableData;
    displayedColumns: { id: number; caption: string }[] = [];


    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'tools';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: ITableData): void {
        if (ref) {
            this.data = ref;
            this.renderTable(this.data);
        }
    }

    renderTable(data: ITableData) {
        this.displayedColumns = data.columns;
    }

    getValue(value) {
        const a = new Date(value);
        if (typeof value === 'number') {
            return value;
        }
        if (a.getDate()) {
            return `${a.getDay()}.${a.getMonth()}.${a.getFullYear()}`;
        }
        return value;
    }
}
