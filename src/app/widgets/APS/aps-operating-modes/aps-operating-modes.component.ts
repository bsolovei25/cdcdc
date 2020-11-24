import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
export interface ITable {
    header: IHeaderName[];
    body: ITableToDisplay[];
}
import { BehaviorSubject, Subject } from 'rxjs';
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';

export interface ITableToDisplay {
    index?: number;
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
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
    styleUrls: ['./aps-operating-modes.component.scss']
})

export class ApsOperatingModesComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public tableToDisplay: ITableToDisplay[] = [];
    data: ITableToDisplay[];
    editedData: ITableToDisplay[] = [];
    editMode: boolean = false;
    public headerName: IHeaderName[] = [];

    constructor(
        protected widgetService: WidgetService,
        public aps: ApsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

        this.aps.showTable$.subscribe(res => {
            if (res !== null) {
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

    protected dataHandler(ref: any): void {
    }

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
        if (this.editedData.find(item => item.index === i)) {
            this.editedData.find(item => item.index === i)[j + 1] = e.target.value;
        } else {
            this.editedData.push({
                index: i,
            });
            this.editedData.find(item => item.index === i)[j + 1] = e.target.value;
        }
    }
}
