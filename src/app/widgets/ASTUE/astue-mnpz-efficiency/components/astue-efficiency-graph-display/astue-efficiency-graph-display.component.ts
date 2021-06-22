import { Component, OnInit, Output, EventEmitter, OnChanges, Input, OnDestroy } from '@angular/core';
import { IAsEfLabel } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { LineChartPlatform } from '../../../../../dashboard/models/@PLATFORM/linechart-platform';
import { IProductionTrend } from '../../../../../dashboard/models/LCO/production-trends.model';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { combineLatest, Subscription } from 'rxjs';
import { AppConfigService } from '@core/service/app-config.service';
import { AstueEfficiencyService } from '../../../../../dashboard/services/widgets/ASTUE/astue-efficiency.service';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';

interface ILabels {
    currentDeviation: IAsEfLabel;
    currentValue: IAsEfLabel;
    currentPlanFact: IAsEfLabel;
    currentPlanPlan: IAsEfLabel;
    periodDeviations: IAsEfLabel;
    periodCounter: IAsEfLabel;
    periodPlanPlan: IAsEfLabel;
    periodPlanFact: IAsEfLabel;
}

@DecorateUntilDestroy()
@Component({
    selector: 'evj-astue-efficiency-graph-display',
    templateUrl: './astue-efficiency-graph-display.component.html',
    styleUrls: ['./astue-efficiency-graph-display.component.scss'],
})
export class AstueEfficiencyGraphDisplayComponent
    extends LineChartPlatform<IProductionTrend>
    implements OnChanges, OnInit, OnDestroy {
    public labels: ILabels = null;
    public data: IProductionTrend[] = [];
    public dataLimits: IDatesInterval = {
        fromDateTime: new Date(2020, 2, 4, 15),
        toDateTime: new Date(2020, 2, 7, 20),
    };
    public selectedPeriod: IDatesInterval = { fromDateTime: null, toDateTime: null };
    public scrollData: IChartMini[] = [];
    public sbLeft: number = 0;
    public sbWidth: number = 100;
    public unit: string = 'тонн';
    @Output() private toggleDisplay: EventEmitter<false> = new EventEmitter<false>();
    private subs: Subscription[] = [];
    private readonly restUrl: string = null;

    constructor(
        public widgetService: WidgetService,
        private appConfigService: AppConfigService,
        private asEfService: AstueEfficiencyService
    ) {
        super(widgetService);
        this.restUrl = appConfigService.restUrl;
    }

    get flowUnits(): string {
        return this.asEfService.currentFlow?.engUnits;
    }

    public ngOnChanges(): void {}

    public ngOnInit(): void {
        super.ngOnInit();

        combineLatest([this.asEfService.data, this.asEfService.selectionFlow$])
            .pipe(takeUntilDestroyed(this))
            .subscribe(([change, value]) => {
                // this.asEfService.selectionFlow$.pipe(takeUntilDestroyed(this)).subscribe((value) => {
                let arr = [];
                const data = this.asEfService.data.getValue();
                value?.forEach((flow) => {
                    const curFlow = data
                        .flatMap((x) => x.units)
                        .flatMap((x) => x.flows)
                        .find((x) => x.id === flow.id);
                    arr = [...arr, ...this.chartDataMap(curFlow?.astueFlowGraphs)];
                });
                this.data = arr;
                this.scrollData = this.data.find((item) => item.graphType === 'fact')?.graph;
            });
        this.asEfService.loadedUnits$.pipe(takeUntilDestroyed(this)).subscribe((units) => {
            this.unit = units?.[0]?.engUnits ?? this.unit;
            this.resetLabel();
            if (units?.length) {
                units?.forEach((unit) => {
                    this.labels.periodPlanPlan.value += unit.periodPlanPlan.value;
                    this.labels.periodPlanFact.value += unit.periodPlanFact.value;
                    this.labels.periodCounter.value += unit.periodCounter.value;
                    this.labels.periodDeviations.value += unit.periodDeviations.value;
                    this.labels.currentPlanPlan.value += unit.currentPlanPlan.value;
                    this.labels.currentPlanFact.value += unit.currentPlanFact.value;
                    this.labels.currentValue.value += unit.currentValue.value;
                    this.labels.currentDeviation.value += unit.currentDeviation.value;
                });
            } else {
                this.resetLabel();
            }
        });
        this.widgetService.currentDates$.pipe(takeUntilDestroyed(this)).subscribe((ref) => {
            this.selectedPeriod = ref;
            if (!this.selectedPeriod) {
                const now = new Date();
                this.selectedPeriod = {
                    fromDateTime: new Date(now.setHours(0, 0, 0, 0)),
                    toDateTime: new Date(now.setHours(23, 59, 59, 999)),
                };
            } else {
                this.selectedPeriod.fromDateTime = new Date(this.selectedPeriod.fromDateTime);
                this.selectedPeriod.toDateTime = new Date(this.selectedPeriod.toDateTime);
            }
        });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    resetLabel(): void {
        this.labels = {
            periodCounter: {
                value: 0,
            },
            periodDeviations: {
                value: 0,
            },
            currentPlanFact: {
                value: 0,
            },
            currentPlanPlan: {
                value: 0,
            },
            periodPlanPlan: {
                value: 0,
            },
            periodPlanFact: {
                value: 0,
            },
            currentValue: {
                value: 0,
            },
            currentDeviation: {
                value: 0,
            },
        };
    }

    protected async restGraphHandler(ref: IDatesInterval): Promise<IProductionTrend[]> {
        return;
    }

    private chartDataMap(data: any): IProductionTrend[] {
        const ret: IProductionTrend[] = [];
        data?.forEach((chart) => {
            const mapped: IProductionTrend = {
                graphType: chart.productionTrendStyle,
                graphStyle: chart.chartStyleType,
                graph: [],
            };
            chart.values?.forEach((val) => {
                mapped.graph.push({
                    value: val.value,
                    timeStamp: new Date(val.date),
                });
            });
            if (mapped.graphType === 'plan') {
                mapped.graphStyle = 'common';
            }
            if (chart.values?.length) {
                ret.push(mapped);
            }
        });
        return ret;
    }

    public clickDisplayButton(): void {
        this.toggleDisplay.emit(false);
    }
}
