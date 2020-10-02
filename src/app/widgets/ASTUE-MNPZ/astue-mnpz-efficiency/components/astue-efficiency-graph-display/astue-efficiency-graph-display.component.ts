import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    Input,
    OnDestroy,
} from '@angular/core';
import { IAsEfLabel } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { LineChartPlatform } from '../../../../../dashboard/models/linechart-platform';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { AstueEfficiencyService } from '../../../../../dashboard/services/ASTUE/astue-efficiency.service';

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

@Component({
    selector: 'evj-astue-efficiency-graph-display',
    templateUrl: './astue-efficiency-graph-display.component.html',
    styleUrls: ['./astue-efficiency-graph-display.component.scss'],
})
export class AstueEfficiencyGraphDisplayComponent extends LineChartPlatform<IProductionTrend>
    implements OnChanges, OnInit, OnDestroy {
    @Input() dataWs: IProductionTrend[] = null;
    @Input() widgetId: string = null;
    @Output() private toggleDisplay: EventEmitter<false> = new EventEmitter<false>();

    public labels: ILabels = {
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

    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 6000,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 3),
                },
                // {
                //     value: 900,
                //     timeStamp: new Date(2020, 2, 4),
                // },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 5800,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'plan',
            graphStyle: 'common',
            graph: [
                {
                    value: 1600,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 3),
                },
                // {
                //     value: 6000,
                //     timeStamp: new Date(2020, 2, 4),
                // },
                {
                    value: 5000,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 3000,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'higherBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1800,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 1700,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 2, 3),
                },
                // {
                //     value: 6200,
                //     timeStamp: new Date(2020, 2, 4),
                // },
                {
                    value: 5200,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 3200,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'lowerBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1400,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 2, 3),
                },
                // {
                //     value: 5800,
                //     timeStamp: new Date(2020, 2, 4),
                // },
                {
                    value: 4800,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 2800,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
    ];

    public dataLimits: IDatesInterval = {
        fromDateTime: new Date(2020, 2, 4, 15),
        toDateTime: new Date(2020, 2, 7, 20),
    };

    private subs: Subscription[] = [];

    private readonly restUrl: string = null;

    get flowUnits(): string {
        return this.AsEfService.currentFlow?.engUnits;
    }

    constructor(
        public widgetService: WidgetService,
        private appConfigService: AppConfigService,
        private AsEfService: AstueEfficiencyService
    ) {
        super(widgetService);
        this.restUrl = appConfigService.restUrl;
    }

    protected async restGraphHandler(ref: IDatesInterval): Promise<IProductionTrend[]> {
        console.log(ref);
        return;
        // try {
        //     return (
        //         await this.http
        //             .get<IWsData<IProductionTrend>>(
        //                 `${this.restUrl}/api/widget-data/` +
        //                     `ed2b05ac-79c5-11ea-92fa-bc5ff45fe692?FromDateTime=` +
        //                     `${ref.fromDateTime.toISOString()}&ToDateTime=${ref.toDateTime.toISOString()}`
        //             )
        //             .toPromise()
        //     )?.data?.items;
        // } catch (e) {
        //     console.error(e);
        //     return null;
        // }
    }

    public ngOnChanges(): void {
        this.wsDataHandler(this.dataWs);
    }

    public ngOnInit(): void {
        this.subs.push(
            this.AsEfService.selection$.subscribe(() => {
                const flow = this.AsEfService.currentFlow;
                if (flow) {
                    this.labels = {
                        periodCounter: {
                            value: flow.periodCounter.value,
                        },
                        periodDeviations: {
                            value: flow.periodDeviations.value,
                        },
                        currentPlanFact: {
                            value: flow.currentPlanFact.value,
                        },
                        currentPlanPlan: {
                            value: flow.currentPlanPlan.value,
                        },
                        periodPlanPlan: {
                            value: flow.periodPlanPlan.value,
                        },
                        periodPlanFact: {
                            value: flow.periodPlanFact.value,
                        },
                        currentValue: {
                            value: flow.currentValue.value,
                        },
                        currentDeviation: {
                            value: flow.currentDeviation.value,
                        },
                    };
                    this.data = this.chartDataMap(flow.astueFlowGraphs);
                    console.log(this.data);
                } else {
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
                    this.data = [];
                }
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    private chartDataMap(data: any): IProductionTrend[] {
        const ret: IProductionTrend[] = [];
        data.forEach((chart) => {
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
