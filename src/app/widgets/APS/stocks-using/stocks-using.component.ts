import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IStocksUsingElement } from '../../../dashboard/models/APS/stocks-using.model';
import { DATASOURCE } from './mock';

@Component({
    selector: 'evj-stocks-using',
    templateUrl: './stocks-using.component.html',
    styleUrls: ['./stocks-using.component.scss'],
})
export class StocksUsingComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IStocksUsingElement[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        this.widgetInit();
        this.data = DATASOURCE;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
