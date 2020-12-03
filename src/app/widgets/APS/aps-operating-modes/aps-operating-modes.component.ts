import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
export interface ITable {
    header: IHeaderName[];
    body: ITableToDisplay[];
}
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';
import { DatePipe, formatDate } from '@angular/common';

export interface ITableToDisplay {
    index?: number;
    edit?: boolean;
}
export interface IHeaderName {
    key: number;
    title: string;
    isId?: boolean;
    writable?: boolean;
}

export interface IEditedData {
    tableId: string;
    columnId: number;
    value: number | string;
}

@Component({
    selector: 'evj-aps-operating-modes',
    templateUrl: './aps-operating-modes.component.html',
    styleUrls: ['./aps-operating-modes.component.scss'],
})
export class ApsOperatingModesComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    public tableToDisplay: ITableToDisplay[] = [];
    data: ITableToDisplay[];
    editedData: IEditedData[] = [];
    editMode: boolean = false;
    idIndex: number;

    selectedRow: number = -1;
    selectedColumn: number = -1;
    public headerName: IHeaderName[] = [];

    constructor(
        protected widgetService: WidgetService,
        public apsService: ApsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

        this.apsService.showTable$.subscribe((res) => {
            this.data = [];
            this.headerName = [];
            if (res !== null) {
                res.body.forEach((str) => {
                    Object.keys(str).forEach((x) => {
                        str[x] = this.getParseValue(str[x]);
                    });
                });
                this.data = res.body;
                res.header.forEach(item => {
                    if (item?.isId) {
                        this.idIndex = item.key;
                    } else {
                        this.headerName.push(item);
                    }
                });
            } else {
                this.data = [];
                this.headerName = [];
            }
            debugger;
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    async saveValues(): Promise<any> {
       const res = await this.apsService.postReferenceBook(this.editedData, this.data);
       this.editedData = [];
       const newData = await this.apsService.getReferenceBook(this.apsService.tableStruct);
       this.apsService.showTable$.next(newData);
       this.editMode = false;
    }

    discard(): void {
        this.selectedRow = -1;
        this.selectedColumn = -1;
        this.editMode = false;
        this.editedData = [];
    }

    editValue(rowNumber: number, columnNumber: number): void {
        this.selectedRow = rowNumber;
        this.selectedColumn = columnNumber;
        this.editMode = true;
    }

    onChangeValue(e: any, tableId: number, columnId: number): void {
        if (this.editedData.find((item) => item.columnId === columnId && item.tableId === (+tableId).toFixed(0))) {
            this.editedData.find((item) => item.columnId === columnId && item.tableId === (+tableId).toFixed(0)).value = e.target.value;
        } else {
            this.editedData.push({
                tableId: (+tableId).toFixed(0),
                columnId,
                value: e.target.value,
            });
        }
    }

    getParseValue(value: string): string {
        if (!isNaN(+value)) {
            if (+value % 0.00001 !== 0) {
                return (+value).toFixed(5);
            }
            return value;
        }
        const date = Date.parse(value);
        if (isNaN(date)) {
            return value;
        }
        return formatDate(date, 'yyyy-MM-dd | hh:mm', 'en');
    }
}
