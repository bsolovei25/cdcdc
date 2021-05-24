import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';
import { IKpeWidgetAttributes } from '../kpe-quality/kpe-quality.component';
import { IKpeGaugeChartPage } from '@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface IKpeSafetyData {
    gaugeCards: IKpeSafetyCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
}

export interface IKpeSafetyCard {
    title: string;
    unit: string;
    deviation?: number;
    percentageInfluence?: number;
    fact: number;
    plan: number;
    isWarning?: boolean;
    percentage?: number;
    deviationPercentage?: number;
}

@Component({
    selector: 'evj-kpe-safety',
    templateUrl: './kpe-safety.component.html',
    styleUrls: ['./kpe-safety.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpeSafetyComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, AfterViewInit {
    @ViewChild('mainGauge') public gaugeChart: ElementRef;

    // Subjects for change data state
    private deviationChartDataSubject$: Subject<IDeviationDiagramData[]> = new Subject();
    private deviationDiagramDataSubject$: Subject<IKpeGaugeChartData> = new BehaviorSubject({ plan: 100, fact: 100 });
    // TODO: Привести к нормальному интерфейсу deviationData
    private deviationDataSubject$: Subject<IKpeGaugeChartData | IKpeGaugeChartPage | null> = new Subject();
    private gaugeCardsSubject$: Subject<IKpeSafetyCard[][]> = new BehaviorSubject([]);
    private cardListSubject$: Subject<IKpeSafetyCard[]> = new BehaviorSubject([]);
    private displayNewDesignSubject$: Subject<boolean> = new BehaviorSubject(false);
    private displayedMonthSubject$: Subject<Date> = new Subject();

    // Observables for transfer data state to components
    public deviationChartData$: Observable<IDeviationDiagramData[]> = this.deviationChartDataSubject$.asObservable();
    public deviationDiagramData$: Observable<IKpeGaugeChartData> = this.deviationDiagramDataSubject$.asObservable();
    // TODO: Привести к нормальному интерфейсу deviationData
    public deviationData$: Observable<
        IKpeGaugeChartData | IKpeGaugeChartPage | null
    > = this.deviationDataSubject$.asObservable();
    public gaugeCards$: Observable<IKpeSafetyCard[][]> = this.gaugeCardsSubject$.asObservable();
    public cardList$: Observable<IKpeSafetyCard[]> = this.cardListSubject$.asObservable();
    public displayNewDesign$: Observable<boolean> = this.displayNewDesignSubject$.asObservable();
    public displayedMonth$: Observable<Date> = this.displayedMonthSubject$.asObservable();

    private isRendered: boolean = false;

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    // Новый дизайн
    public percentData: {
        percent: number;
        percentStatus: 'default' | 'warning';
    } = {
        percent: 2,
        percentStatus: 'warning',
    };

    constructor(
        protected widgetService: WidgetService,
        private kpeHelperService: KpeHelperService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngAfterViewInit(): void {
        queueMicrotask(() => (this.isRendered = true));
    }

    public trackByIndex(index: number): number {
        return index;
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        if (!this.isRendered) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height}px`;
    }

    protected dataHandler(ref: IKpeSafetyData): void {
        this.deviationChartDataSubject$.next(this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart));
        this.cardListSubject$.next(
            this.kpeHelperService
                .sortArray<IKpeSafetyCard>(ref.gaugeCards, 4)
                .reduce((acc, current) => [...acc, ...current], [])
                .map((curr) => ({ ...curr, deviationPercentage: 100 - curr.percentage }))
        );
        this.deviationDiagramDataSubject$.next(ref.deviationDiagram);
        this.deviationDataSubject$.next(ref.deviationDiagram);
        ref.deviationChart.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonthSubject$.next(new Date(data.graph?.[0]?.timeStamp));
            }
        });
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesignSubject$.next(this.attributes.IsDesign);
    }
}
