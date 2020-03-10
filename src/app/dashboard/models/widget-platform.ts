import {NewWidgetService} from '../services/new-widget.service';
import {Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class WidgetPlatform implements OnInit, OnDestroy {
    public widgetCode: string;
    public widgetTitle: string;
    public widgetUnits: string;
    public widgetType: string;
    public widgetIcon: string;

    protected itemCols: number = 30;
    protected itemRows: number = 20;

    private subscriptions: Subscription[] = [];

    constructor(
        protected widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public widgetId: string,
        @Inject('uniqId') public widgetUniqId: string,
    ) {

    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.widgetId).subscribe((ref) => {
                this.widgetTitle = ref?.title;
                this.widgetType = ref?.widgetType;
                this.showMock(this.isMock);
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((el) => el.unsubscribe());
    }

    private showMock(show: boolean): void {
        if (show) {
            this.dataDisconnect();
        } else {
            this.dataConnect();
        }
    }

    private dataConnect(): void {
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.widgetId, this.widgetType)
                .subscribe((ref: any) => {
                    this.dataHandler(ref);
                })
        );
    }

    private dataDisconnect(): void {

    }

    protected abstract dataHandler(ref: any): void;
}
