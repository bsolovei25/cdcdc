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
    planM3: number;
    valuePlan?: number;
    valuePlanM3: number;
    averageTonne: number;
    averageM3: number;
    instantTonne: number;
    instantM3: number;
    total: number;
    totalM3: number;
    planPercent: string;
    prediction: number;
    predictionM3: number;
    deviation: number;
    deviationM3: number;
    deviationPercent: string;
    deviationColor?: string
    valueRecommended?: number;
    valueRecommendedTonne: number;
    hasComment?: boolean;
}
export interface IKpeTableTabs {
    name: string;
    id: string;
}

export interface IKpeTableData {
    allTabs: IKpeTableTabs[];
    groups: IKpeTable[];
    title: string;
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
    public currentTab: number = 0;

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

    protected dataHandler(ref: IKpeTableData): void {
        this.tabsList$.next(ref?.allTabs);
    }

    protected dataConnect(): void {
        super.dataConnect();
    }

    public changeTab(tabNumber: number): void {
        this.currentTab = tabNumber;
    }
}
