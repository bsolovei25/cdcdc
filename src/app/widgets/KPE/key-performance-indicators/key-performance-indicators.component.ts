import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { IKpeGaugeChartPage } from "./components/gauge-diagram/gauge-diagram.component";
import { KpeEngUnitsComparator } from "../shared/kpe-eng-units-comparator";
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export type KeyPerformanceIndicatorType = 'pimsPlan' | 'normPlan' | 'operPlan';

export interface IKpeGaugeChartData {
    pimsPlan: IKpeGaugeChartPage;
    normPlan: IKpeGaugeChartPage;
    operPlan: IKpeGaugeChartPage;
}

@Component({
    selector: 'evj-kpe-key-performance-indicators',
    templateUrl: './key-performance-indicators.component.html',
    styleUrls: ['./key-performance-indicators.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyPerformanceIndicatorsComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, OnDestroy {
    // Subjects for change data state
    private sourceDataSubject$: BehaviorSubject<IKpeGaugeChartData> = new BehaviorSubject(null);
    private diagramDataSubject$: BehaviorSubject<IKpeGaugeChartPage> = new BehaviorSubject(null);
    private displayNewDesignSubject$: Subject<boolean> = new BehaviorSubject(false);

    // Observables for transfer data state to components
    public sourceData$: Observable<IKpeGaugeChartData> = this.sourceDataSubject$.asObservable();
    public diagramData$: Observable<IKpeGaugeChartPage> = this.diagramDataSubject$.asObservable();
    public displayNewDesign$: Observable<boolean> = this.displayNewDesignSubject$.asObservable();

    public activeIndicatorType: KeyPerformanceIndicatorType;
    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();
    public displayNewDesign: boolean;

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.setActiveIndicator();
    }

    public setActiveIndicator(indicator?: KeyPerformanceIndicatorType): void {
        indicator = indicator ? indicator : this.activeIndicatorType ? this.activeIndicatorType : 'pimsPlan';
        this.activeIndicatorType = indicator;
        if (this.sourceDataSubject$.value) {
            this.diagramDataSubject$.next(this.sourceDataSubject$.value[indicator]);
        }
    }

    protected dataHandler(ref: IKpeGaugeChartData): void {
        this.sourceDataSubject$.next(ref);
        this.setActiveIndicator();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesignSubject$.next(this.attributes.IsDesign);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
