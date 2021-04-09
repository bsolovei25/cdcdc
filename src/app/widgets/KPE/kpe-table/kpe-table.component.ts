import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { BehaviorSubject } from 'rxjs';
import { KpeTableDevelopmentComponentComponent } from './components/kpe-table-development-component/kpe-table-development-component.component';

export interface IKpeTableHeader {
    name: string;
    id: string;
}
export interface IKpeTable {
    name: string;
    criticalEventCount?: number,
    eventCount?: number,
    nonCriticalEventCount?: number,
    rows: IKpeTableBody[];
}
export interface IKpeTableBody {
    id: number;
    name: string;
    plan: number;
    valuePlan?: number;
    averageTonne: number;
    averageM3: number; 
    instantTonne: number;
    instantM3: number;
    total: number;
    planPercent: string;
    prediction: number;
    deviation: number;
    deviationPercent: string;
    deviationColor?: string
    recommended?: number;
    hasComment?: boolean;
}
export interface IKpeTableTabs {
    name: string;
    id: string;
}

@Component({
    selector: 'evj-kpe-table',
    templateUrl: './kpe-table.component.html',
    styleUrls: ['./kpe-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpeTableComponent extends WidgetPlatform<unknown> implements OnInit {
    public specialComponent: typeof KpeTableDevelopmentComponentComponent = KpeTableDevelopmentComponentComponent;

    public tabsList$: BehaviorSubject<IKpeTableTabs[]> = new BehaviorSubject<IKpeTableTabs[]>([]);
    public currentTab: number = 1;

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private injector: Injector
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public getInjector = (widgetId: string, channelId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId },
            ],
            parent: this.injector,
        });
    };

    protected dataHandler(ref: any): void {}

    protected dataConnect(): void {
        super.dataConnect();
        this.getSubChannels().then();
    }

    private async getSubChannels(): Promise<void> {
        const subChannels = await this.widgetService.getAvailableChannels<IKpeTableTabs>(this.widgetId);
        this.tabsList$.next(subChannels);
    }

    public changeTab(tabNumber: number): void {
        this.currentTab = tabNumber;
    }
}
