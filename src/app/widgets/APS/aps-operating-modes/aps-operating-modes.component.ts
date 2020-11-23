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
                name1: 'PoolAS6DZ_W1',
                name2: '<W1',
                name3: 'ФР.БЕН.НК-195',
                name4: 'SPG15',
                name5: 'Плот. при 15 °С',
                name6: '43 966.0',
                name7: '43 966.0',
                name8: '0',
            },
            {
                name1: 'PoolAS6DZ_W1',
                name2: '<W1',
                name3: 'ФР.БЕН.НК-195',
                name4: 'SPG15',
                name5: 'Плот. при 15 °С',
                name6: '43 966.0',
                name7: '43 966.0',
                name8: '0',
            },
            {
                name1: 'PoolAS6DZ_W1',
                name2: '<W1',
                name3: 'ФР.БЕН.НК-195',
                name4: 'SPG15',
                name5: 'Плот. при 15 °С',
                name6: '43 966.0',
                name7: '43 966.0',
                name8: '0',
            },
            {
                name1: 'PoolAS6DZ_W1',
                name2: '<W1',
                name3: 'ФР.БЕН.НК-195',
                name4: 'SPG15',
                name5: 'Плот. при 15 °С',
                name6: '43 966.0',
                name7: '43 966.0',
                name8: '0',
            },
            {
                name1: 'PoolAS6DZ_W1',
                name2: '<W1',
                name3: 'ФР.БЕН.НК-195',
                name4: 'SPG15',
                name5: 'Плот. при 15 °С',
                name6: '43 966.0',
                name7: '43 966.0',
                name8: '0',
            }
        ];
        this.headerName = [
            {header: 'Название', id: '1'},
            {header: 'Название', id: '2'},
            {header: 'Название', id: '3'},
            {header: 'Название', id: '4'},
            {header: 'Название', id: '5'},
            {header: 'Название', id: '6'},
            {header: 'Название', id: '7'},
            {header: 'Название', id: '8'},
        ];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
