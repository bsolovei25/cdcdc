import { Directive, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class WidgetPlatform<T = unknown> implements OnDestroy {
    public widgetCode?: string;
    public widgetTitle?: string;
    public widgetUnits?: string;
    public widgetType?: string;
    public widgetIcon?: string;
    public widgetOptions?: any; // TODO line-chart
    public widgetIsVideoWall?: boolean = false;
    public attributes: T = null;

    protected isRealtimeData: boolean = true;

    public static itemCols: number = 30;
    public static itemRows: number = 20;
    public static minItemCols: number = 8;
    public static minItemRows: number = 6;

    public isHover: boolean = false;
    public subscriptions: Subscription[] = [];
    protected hoverTimer: ReturnType<typeof setTimeout>;

    protected constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public widgetId: string,
        @Inject('uniqId') public widgetUniqId: string
    ) {}

    public ngOnDestroy(): void {
        this.subscriptions.forEach((el) => {
            try {
                el?.unsubscribe();
            } catch {}
        });
        this.widgetService.removeWidget(this.widgetId);
    }

    protected widgetInit(isContainer: boolean = false): void {
        setTimeout(() => {
            this.subscriptions.push(
                this.widgetService.getWidgetChannel(this.widgetId).subscribe((ref) => {
                    if (!ref) {
                        return;
                    }
                    this.widgetTitle = ref?.title;
                    this.widgetType = ref?.widgetType;
                    this.widgetOptions = ref.widgetOptions;
                    this.widgetUnits = ref.units;
                    this.widgetIsVideoWall = ref.isVideoWall ?? false;
                    this.attributes = ref.attributes;
                    if (isContainer) {
                        this.dataDisconnect();
                        return;
                    }
                    this.dataConnect();
                    console.log(this.widgetType);
                })
            );
        });
    }

    protected dataConnect(): void {
        if (!this.isRealtimeData) {
            return;
        }
        this.subscriptions.push(
            this.widgetService.getWidgetLiveDataFromWS(this.widgetId, this.widgetType).subscribe((ref: unknown) => {
                this.dataHandler(ref);
            })
        );
    }

    protected dataDisconnect(): void {}

    protected abstract dataHandler(ref: unknown): void;

    public onMouseEnter(): void {
        if (this.hoverTimer) {
            clearInterval(this.hoverTimer);
        }
        this.isHover = true;
    }

    public onMouseExit(): void {
        this.hoverTimer = setTimeout(() => (this.isHover = false), 200);
    }

    protected setWsOptions<O>(options: O): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, options);
    }
}
