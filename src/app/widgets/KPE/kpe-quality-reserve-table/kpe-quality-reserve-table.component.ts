import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnInit } from "@angular/core";
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { BehaviorSubject } from 'rxjs';
import { KpeQualityReserveTableItemComponent } from "./components/kpe-quality-reserve-table-item/kpe-quality-reserve-table-item.component";
import { KpeQualityReserveTableService } from "@dashboard/services/widgets/KPE/kpe-quality-reserve-table.service";

export interface IQualityReserveTableTabs {
    title: string;
    id: string;
}
export interface IQualityReserveTableHeaders {
    name: string;
    unit: string;
}

export interface IQualityReserveTableData {
    cells: IQualityReserveTableDataRow[];
}

export interface IQualityReserveTableDataRow {
    value: string;
    isWarning: boolean;
}

@Component({
    selector: 'evj-kpe-quality-reserve-table',
    templateUrl: './kpe-quality-reserve-table.component.html',
    styleUrls: ['./kpe-quality-reserve-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpeQualityReserveTableComponent extends WidgetPlatform<unknown> implements OnInit {
    public tabsList$: BehaviorSubject<IQualityReserveTableTabs[]> = new BehaviorSubject<IQualityReserveTableTabs[]>([]);
    public currentTab: number = 1;
    public defaultUnits: number = 1;
    public displayedColumns: string[];
    public readonly specialComponent: typeof KpeQualityReserveTableItemComponent = KpeQualityReserveTableItemComponent;
    public selectedOption: number;

    constructor(
        protected widgetService: WidgetService,
        private kpeQualityReserveTableService: KpeQualityReserveTableService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private injector: Injector
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.getSubChannels().then();
    }

    public changeTab(tabNumber: number): void {
        this.currentTab = tabNumber;
    }

    private async getSubChannels(): Promise<void> {
        const subChannels = await this.widgetService.getAvailableChannels<IQualityReserveTableTabs>(this.widgetId);
        this.tabsList$.next(subChannels);
    }

    public getInjector = (widgetId: string, channelId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId }
            ],
            parent: this.injector,
        });
    };

    protected dataHandler(ref: any): void {
        this.selectedOption = ref.currentTab.defaultUnits ?? this.defaultUnits; // если defaultUnits не приходят или приходят пустые, то используем по умолчанию, которые 0
        this.kpeQualityReserveTableService.selectFilter(this.selectedOption);
    }

    public changeUnits($event: number): void {
        this.selectedOption = $event;
        this.kpeQualityReserveTableService.selectFilter(this.selectedOption);
    }
}
