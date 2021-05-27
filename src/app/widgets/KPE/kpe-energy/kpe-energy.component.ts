import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { IKpeEnergyTab } from "./components/kpe-energy-tab/kpe-energy-tab.component";
import { IDeviationDiagramData } from "../shared/kpe-deviation-diagram/kpe-deviation-diagram.component";
import { IKpeGaugeChartData, IKpeLineChartData } from "../shared/kpe-charts.model";
import { KpeHelperService } from "../shared/kpe-helper.service";
import { KpeEngUnitsComparator } from "../shared/kpe-eng-units-comparator";
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";
import { IKpeGaugeChartPage } from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";
import { IKpeUniversalCardLineChart } from "@widgets/KPE/shared/kpe-universal-card/kpe-universal-card.component";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export interface IKpeEnergy {
    tabs: IKpeEnergyTab[] | null;
    chart: IKpeLineChartData[] | null;
    diagram: IKpeGaugeChartData | IKpeGaugeChartPage | null;
    displayMode: 'tiled' | 'line';
}

@Component({
    selector: 'evj-kpe-energy',
    templateUrl: './kpe-energy.component.html',
    styleUrls: ['./kpe-energy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpeEnergyComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit {
    // static true fix expression has been checked
    @ViewChild('gauge', { static: true })
    public gaugeElement: ElementRef;

    // Subjects for change data state
    private dataSubject$: BehaviorSubject<IKpeEnergy> = new BehaviorSubject<IKpeEnergy>({ tabs: null, chart: null, diagram: null, displayMode: 'tiled' });
    private deviationChartDataSubject$: Subject<IDeviationDiagramData[]> = new BehaviorSubject(null);
    private displayedMonthSubject$: Subject<Date> = new BehaviorSubject(null);
    private displayNewDesignSubject$: Subject<boolean> = new BehaviorSubject(false);
    private displayModeSubject$: Subject<'tiled' | 'line'> = new Subject();

    // Observables for transfer data state to components
    public data$: Observable<IKpeEnergy> = this.dataSubject$.asObservable();
    public deviationChartData$: Observable<IDeviationDiagramData[]> = this.deviationChartDataSubject$.asObservable();
    public displayedMonth$: Observable<Date> = this.displayedMonthSubject$.asObservable();
    public displayNewDesign$: Observable<boolean> = this.displayNewDesignSubject$.asObservable();
    public displayMode$: Observable<'tiled' | 'line'> = this.displayModeSubject$.asObservable();

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    constructor(
        private http: HttpClient,
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

    public trackByIndex(index: number): number {
        return index;
    }

    protected dataHandler(ref: IKpeEnergy): void {
        this.dataSubject$.next(this.setDeviationPercentage(ref));
        this.displayModeSubject$.next(ref.displayMode)
        if (this.kpeHelperService.compare<IKpeEnergyTab>(this.dataSubject$.value.tabs, ref.tabs)) {
            this.dataSubject$.next({...this.dataSubject$.value, tabs: ref.tabs})
        }
        if (this.kpeHelperService.compare<IKpeLineChartData>(this.dataSubject$.value.chart, ref.chart)) {
            this.dataSubject$.next({...this.dataSubject$.value, chart: ref.chart});
        }
        this.dataSubject$.next({...this.dataSubject$.value, diagram: ref.diagram});

        this.deviationChartDataSubject$.next(this.kpeHelperService.prepareKpeLineChartData(this.dataSubject$.value.chart));

        ref.chart.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonthSubject$.next(new Date(data.graph?.[0]?.timeStamp));
            }
        });
    }

    private setDeviationPercentage(srcArr: IKpeEnergy): IKpeEnergy {
        return {
            ...srcArr,
            tabs: srcArr.tabs.map(x => ({
                ...x,
                deviationPercentage: 100 - x.percentage
            }))
        };
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesignSubject$.next(this.attributes.IsDesign);
    }

    get chartWidth(): string {
        if (!(this.gaugeElement?.nativeElement?.offsetHeight > 0)) {
            return;
        }
        const height = this.gaugeElement.nativeElement.offsetHeight;
        return `min-width: ${height}px`;
    }

    public getContentData(tab: IKpeEnergyTab): IKpeUniversalCardLineChart {
        return {
            name: tab.title,
            percent: tab.percentage,
            percentStatus: 'default',
            deviationPlanPredict: tab.deviationPlanPredict,
            deviationPlanPredictFact: tab.deviationPlanPredictFact,
            fact: tab.fact,
            percentageInfluence: +tab.percentageInfluence.toFixed(2),
            isWarning: tab.isWarning,
            plan: tab.plan,
            planPredict: tab.plan,
            predict: tab.predict,
        }
    }
}
