import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { WidgetPlatform } from '../../../models/widget-platform';

@Component({
    selector: 'evj-widget-pies',
    templateUrl: './widget-pies.component.html',
    styleUrls: ['./widget-pies.component.scss'],
})
export class WidgetPiesComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public datas = [];

    protected static itemCols: number = 16;
    protected static itemRows: number = 10;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'tools';
        this.widgetUnits = 'шт.';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.datas = ref.items;
    }
}
