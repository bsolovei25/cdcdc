import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

export interface ITableToDisplay {
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    name6: string;
    name7: string;
    name8: string;
}
export interface IHeaderName {
    header: string;
    id?: string;
}

@Component({
    selector: 'evj-aps-operating-modes',
    templateUrl: './aps-operating-modes.component.html',
    styleUrls: ['./aps-operating-modes.component.scss']
})

export class ApsOperatingModesComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public tableToDisplay: ITableToDisplay[] = [];
    public headerName: IHeaderName[] = [];

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
        this.tableToDisplay = [
            {
                name1: '1',
                name2: '2',
                name3: '3',
                name4: '4',
                name5: '5',
                name6: '6',
                name7: '7',
                name8: '8',
            },
            {
                name1: '9',
                name2: '10',
                name3: '11',
                name4: '12',
                name5: '13',
                name6: '14',
                name7: '15',
                name8: '16',
            },
            {
                name1: '1',
                name2: '2',
                name3: '3',
                name4: '4',
                name5: '5',
                name6: '6',
                name7: '7',
                name8: '8',
            },
            {
                name1: '9',
                name2: '10',
                name3: '11',
                name4: '12',
                name5: '13',
                name6: '14',
                name7: '15',
                name8: '16',
            }
        ];
        this.headerName = [
            {header: 'title 1', id: '1'},
            {header: 'title 2', id: '2'},
            {header: 'title 3', id: '3'},
            {header: 'title 4', id: '4'},
            {header: 'title 5', id: '5'},
            {header: 'title 6', id: '6'},
            {header: 'title 7', id: '7'},
            {header: 'title 8', id: '8'},
        ];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
