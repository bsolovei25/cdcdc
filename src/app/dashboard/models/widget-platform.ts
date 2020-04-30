import { Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../services/widget.service';

export abstract class WidgetPlatform implements OnDestroy {
    public widgetCode?: string;
    public widgetTitle?: string;
    public widgetUnits?: string;
    public widgetType?: string;
    public widgetIcon?: string;
    public widgetOptions?: any; // TODO line-chart

    protected isRealtimeData: boolean = true;

    public static itemCols: number = 30;
    public static itemRows: number = 20;
    public static minItemCols: number = 8;
    public static minItemRows: number = 6;

    public isHover: boolean = false;
    public subscriptions: Subscription[] = [];
    protected hoverTimer: any;

    protected constructor(
        protected widgetService: WidgetService,
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
                    this.widgetOptions = ref.widgetOptions;
                    if (!this.isMock) {
                        console.log(this.widgetType);
                    }
                    this.showMock(this.isMock);
                }
            })
        );
    }

    private showMock(show: boolean): void {
        if (show) {
            this.dataDisconnect();
        } else {
            this.dataConnect();
        }
    }

    protected dataConnect(): void {
        if (!this.isRealtimeData) {
            return;
        }
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.widgetId, this.widgetType)
                .subscribe((ref: any) => {
                    this.dataHandler(ref);
                })
        );
    }

    protected dataDisconnect(): void { }

    protected abstract dataHandler(ref: any): void;

    public onMouseEnter(): void {
        if (this.hoverTimer) {
            clearInterval(this.hoverTimer);
        }
        this.isHover = true;
    }

    public onMouseExit(): void {
        this.hoverTimer = setTimeout(() => (this.isHover = false), 200);
    }
}
