import { Component, Inject, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { WidgetPlatform } from '../../../../models/widget-platform';

@Component({
    selector: 'evj-widget-pies',
    templateUrl: './widget-pies.component.html',
    styleUrls: ['./widget-pies.component.scss'],
})
export class WidgetPiesComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public previewTitle: string = 'widget-pies';

    public uniqal;

    public datas = [];

    constructor(
        public widgetService: NewWidgetService,
        // private cdref: ChangeDetectorRef,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'tools';
        this.widgetUnits = 'шт.';
        this.itemCols = 16;
        this.itemRows = 10;
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


    private wsConnect() {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'pie-diagram').subscribe((ref) => {
            this.datas = ref.items;
        });
    }
    private wsDisconnect() { }

}
