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
    writable?: boolean;
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
    editedData: ITableToDisplay[] = [];
    editMode: boolean = false;
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
            if (res !== null) {
                res.body.forEach((str) => {
                    Object.keys(str).forEach((x) => {
                        str[x] = this.getParseValue(str[x]);
                    });
                });
                this.data = res.body;
                this.headerName = res.header;
            } else {
                this.data = [];
                this.headerName = [];
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    saveValues(): void {
        // Должна быть отправка editedData, но пока просто очищается массив изменений
        this.editedData = [];
    }

    discard(): void {
        this.editMode = false;
        this.editedData = [];
    }

    editValue(): void {
        this.editMode = true;
    }

    onChangeValue(e: any, i: number, j: number): void {
        if (this.editedData.find((item) => item.index === i)) {
            this.editedData.find((item) => item.index === i)[j + 1] = e.target.value;
        } else {
            this.editedData.push({
                index: i,
            });
            this.editedData.find((item) => item.index === i)[j + 1] = e.target.value;
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
