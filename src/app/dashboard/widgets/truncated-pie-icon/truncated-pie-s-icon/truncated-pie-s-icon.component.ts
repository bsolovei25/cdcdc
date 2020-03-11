import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { WidgetPlatform } from '../../../models/widget-platform';

@Component({
    selector: 'evj-truncated-pie-s-icon',
    templateUrl: './truncated-pie-s-icon.component.html',
    styleUrls: ['./truncated-pie-s-icon.component.scss'],
})
export class TruncatedPieSIconComponent extends WidgetPlatform implements OnInit, OnDestroy {

    protected static itemCols: number = 26;
    protected static itemRows: number = 10;

    public datas;
    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'triangle';
        this.widgetUnits = 'шт.';
        this.widgetType = 'truncated-pie-s-icon';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.datas = ref.values;
    }

}
