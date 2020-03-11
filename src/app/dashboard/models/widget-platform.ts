import { NewWidgetService } from '../services/new-widget.service';
import { Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class WidgetPlatform implements OnDestroy {
    public widgetCode?: string;
    public widgetTitle?: string;
    public widgetUnits?: string;
    public widgetType?: string;
    public widgetIcon?: string;

    protected isRealtimeData: boolean = true;

    protected static itemCols: number = 30;
    protected static itemRows: number = 20;

    protected subscriptions: Subscription[] = [];

    protected constructor(
        protected widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public widgetId: string,
        @Inject('uniqId') public widgetUniqId: string
    ) { }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((el) => el.unsubscribe());
    }

    protected widgetInit(): void {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.widgetId).subscribe((ref) => {
                if (ref) {
                    this.widgetTitle = ref?.title;
                    this.widgetType = ref?.widgetType;
                    this.showMock(this.isMock);
                }
            })
        );
    }

    private showMock(show: boolean): void {
        if (show) {
            this.dataDisconnect();
        } else {
            if (this.isRealtimeData) { this.dataConnect(); }
        }
    }

    protected dataConnect(): void {
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.widgetId, this.widgetType)
                .subscribe((ref: any) => {
                    this.dataHandler(ref);
                })
        );
    }

    private dataDisconnect(): void { }

    protected abstract dataHandler(ref: any): void;
}
