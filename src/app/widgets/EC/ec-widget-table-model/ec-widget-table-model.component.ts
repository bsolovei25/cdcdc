import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';
import { EcWidgetService } from '@widgets/EC/ec-widget-shared/ec-widget.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

interface ITableModelResponse {
    groups: IECTableIndicatorsItem[];
    isHistoricalDataSupported: boolean;
    widgetType: string;
}

export interface IECTableIndicatorsItem {
    name: string;
    countExceeding: number;
    items: IECTableIndicatorsItemChild[];
    isFiltered?: boolean;
}

export interface IECTableIndicatorsItemChild {
    id: string;
    name: string;
    unitsOfMeasure: string;
    fact: number;
    plan: number;
    isExceeding?: boolean;
}

@Component({
    selector: 'evj-ec-widget-table-model',
    templateUrl: './ec-widget-table-model.component.html',
    styleUrls: ['./ec-widget-table-model.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetTableModelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public expandedElement: SelectionModel<string> = new SelectionModel(true);
    public data$: BehaviorSubject<IECTableIndicatorsItem[] | null> = new BehaviorSubject(null);
    public select: FormControl;

    private virtualChannel: VirtualChannel<ITableModelResponse>;
    private virtualChannelSubscription: Subscription;

    constructor(
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        public widgetService: WidgetService,
        private ecWidgetService: EcWidgetService
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.select = new FormControl('');
        this.initListeners();
    }

    public ngOnDestroy(): void {
        this.virtualChannel?.dispose();
        this.virtualChannelSubscription?.unsubscribe();
        super.ngOnDestroy();
    }

    public onClickTr(event: MouseEvent, element: IECTableIndicatorsItem): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    public onClickRow(event: MouseEvent, element: IECTableIndicatorsItemChild): void {
        event.stopPropagation();
    }

    protected dataConnect(): void {
        this.subscriptions.push(
            this.ecWidgetService.mnemonicWidgetBakeItemId$
                .subscribe(id => {
                    this.data$.next(null);
                    this.virtualChannel?.dispose();
                    this.virtualChannelSubscription?.unsubscribe();

                    this.virtualChannel = new VirtualChannel<ITableModelResponse>(this.widgetService, {
                        channelId: this.widgetId,
                        subchannelId: id
                    });

                    this.virtualChannelSubscription = this.virtualChannel.data$
                        .pipe(map(data => data.groups))
                        .subscribe(res => {
                            this.data$.next(this.normalizeData(res));
                        });
                })
        );
    }

    protected dataHandler(ref: unknown): void {}

    private normalizeData(data: IECTableIndicatorsItem[]): IECTableIndicatorsItem[] {
        return data.map(item => ({
            ...item,
            isFiltered: false
        }));
    }

    private initListeners(): void {
        this.subscriptions.push(
            this.select.valueChanges
                .subscribe(param => {
                    const data = this.data$.getValue().map(item => ({
                        ...item,
                        isFiltered: param ? item.name !== param : false
                    }));
                    this.data$.next(data);
                })
        );
    }
}
