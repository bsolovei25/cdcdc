import { WidgetService } from '@dashboard/services/widget.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface IVirtualChannelSettings {
    channelId: string;
    subchannelId?: string;
    widgetType?: string;
}

export class VirtualChannel<T> {
    // Необходимо подписаться для получения данных из канала / подканала
    public data$: Subject<T> = new Subject<T>();
    private wsSubscription$: Subject<null> = new Subject<null>();

    private readonly channelId: string;
    private readonly subchannelId: string;
    private readonly widgetType: string;

    constructor(private widgetService: WidgetService, private settings: IVirtualChannelSettings) {
        this.channelId = settings.channelId;
        this.subchannelId = settings.subchannelId;
        this.widgetType = settings.widgetType;

        this.init();
    }

    private init(): void {
        try {
            this.connectChannel(this.channelId, this.subchannelId, this.widgetType)
                ?.pipe(takeUntil(this.wsSubscription$))
                .subscribe(this.setData.bind(this));
        } catch (e) {
            console.warn('VirtualChannel.init', e);
        }
    }

    // вызвать для удаления
    public dispose(): void {
        this.disconnectChannel(this.channelId, this.subchannelId);
    }

    private connectChannel(channelId: string, subchannelId: string, widgetType: string): Observable<T> {
        if (!!subchannelId) {
            return this.widgetService.getChannelLiveDataFromWs<T>(subchannelId, channelId);
        } else {
            return this.widgetService.getWidgetLiveDataFromWS<T>(channelId, widgetType);
        }
    }

    private disconnectChannel(channelId: string, subchannelId: string): void {
        console.log('disconnectChannel');
        if (!!subchannelId) {
            this.widgetService.removeChannel(channelId, subchannelId);
        } else {
            this.widgetService.removeWidget(channelId);
        }
        this.wsSubscription$.next(null);
        this.wsSubscription$.complete();
    }

    private setData(data: T): void {
        if (!data) {
            return;
        }
        this.data$.next({ ...data });
    }
}
