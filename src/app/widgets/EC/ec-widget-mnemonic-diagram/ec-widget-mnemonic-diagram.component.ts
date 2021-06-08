import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '@dashboard/services/widget.service';
import { EcWidgetService, IEquipmentPayload } from '@widgets/EC/ec-widget-shared/ec-widget.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface IMnemonicDiagramResponse {
    items: IMnemonicEquipmentData[];
}

export interface IMnemonicEquipmentData {
    id: string;
    name: string;
    isActive?: boolean;
    fileName?: string;
    isFiltered?: boolean;
}

@Component({
    selector: 'evj-ec-widget-mnemonic-diagram',
    templateUrl: './ec-widget-mnemonic-diagram.component.html',
    styleUrls: ['ec-widget-mnemonic-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetMnemonicDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data$: BehaviorSubject<IMnemonicEquipmentData[] | null> = new BehaviorSubject<IMnemonicEquipmentData[] | null>(null);

    private virtualChannel: VirtualChannel<IMnemonicDiagramResponse>;
    private virtualChannelSubscription: Subscription;

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private ecWidgetService: EcWidgetService
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        this.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.virtualChannel?.dispose();
        this.virtualChannelSubscription?.unsubscribe();
        this.ecWidgetService.headerWidgetEquipmentId$.next(null);
    }

    protected dataHandler(ref: unknown): void {
    }

    protected dataConnect(): void {
        this.subscriptions.push(
            this.ecWidgetService.headerWidgetEquipmentId$
                .subscribe((equipmentPayload: IEquipmentPayload | null) => {
                    this.virtualChannel?.dispose();
                    this.virtualChannelSubscription?.unsubscribe();
                    this.data$.next(null);

                    if (equipmentPayload) {
                        this.virtualChannel = new VirtualChannel<IMnemonicDiagramResponse>(this.widgetService, {
                            channelId: this.widgetId,
                            subchannelId: equipmentPayload.id
                        });

                        this.virtualChannelSubscription = this.virtualChannel.data$
                            .pipe(map(data => data.items))
                            .subscribe(ref => {
                                this.data$.next(this.normalizeData(ref, equipmentPayload.fileName));
                            });
                    }
                })
        );
    }

    private normalizeData(data: IMnemonicEquipmentData[], fileName: string): IMnemonicEquipmentData[] {
        return data.map(item => ({
            ...item,
            fileName,
            isActive: false,
            isFiltered: false
        }));
    }
}
