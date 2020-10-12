import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    Input,
    OnDestroy
} from '@angular/core';
import { IAsEfLabel } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { LineChartPlatform } from '../../../../../dashboard/models/linechart-platform';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { Subscription } from 'rxjs';
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
    styleUrls: ['./astue-efficiency-graph-display.component.scss']
})
export class AstueEfficiencyGraphDisplayComponent extends LineChartPlatform<IProductionTrend>
    implements OnChanges, OnInit, OnDestroy {
    @Input() dataWs: IProductionTrend[] = null;
    @Input() widgetId: string = null;
    @Output() private toggleDisplay: EventEmitter<false> = new EventEmitter<false>();

    public labels: ILabels = null;

    public data: IProductionTrend[] = [];

    public dataLimits: IDatesInterval = {
        fromDateTime: new Date(2020, 2, 4, 15),
        toDateTime: new Date(2020, 2, 7, 20)
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
            this.AsEfService.selectionFlow$.subscribe((value) => {
                let arr = [];
                value?.forEach(flow => {
                    arr = [...arr, ...this.chartDataMap(flow?.astueFlowGraphs)];
                });
                this.data = arr;
                console.log(this.data);
            }),
            this.AsEfService.selectionUnit$.subscribe(units => {
                this.resetLabel();
                if (units?.length) {
                    units?.forEach(unit => {
                        this.labels.periodPlanPlan.value += unit.periodPlanPlan.value;
                        this.labels.periodPlanFact.value += unit.periodPlanFact.value;
                        this.labels.periodCounter.value += unit.periodCounter.value;
                        this.labels.periodDeviations.value += unit.periodDeviations.value;
                        this.labels.currentPlanPlan.value += unit.currentPlanPlan.value;
                        this.labels.currentPlanFact.value += unit.currentPlanFact.value;
                        this.labels.currentValue.value += unit.currentValue.value;
                        this.labels.currentDeviation.value += unit.currentDeviation.value;
                        // this.labels = {
                        //     periodCounter: {
                        //         value: unit.periodCounter.value
                        //     },
                        //     periodDeviations: {
                        //         value: 111111
                        //     },
                        //     currentPlanFact: {
                        //         value: unit.currentPlanFact.value
                        //     },
                        //     currentPlanPlan: {
                        //         value: unit.currentPlanPlan.value
                        //     },
                        //     periodPlanPlan: {
                        //         value: unit.periodPlanPlan.value
                        //     },
                        //     periodPlanFact: {
                        //         value: unit.periodPlanFact.value
                        //     },
                        //     currentValue: {
                        //         value: unit.currentValue.value
                        //     },
                        //     currentDeviation: {
                        //         value: unit.currentDeviation.value
                        //     }
                        // };
                    });
                } else {
                    this.resetLabel();
                }

            }),
            this.AsEfService.selection$.subscribe(() => {
                const flow = this.AsEfService.currentFlow;
                const unit = this.AsEfService.currentUnit;
                // if (flow) {
                //     this.labels = {
                //         periodCounter: {
                //             value: unit.periodCounter.value
                //         },
                //         periodDeviations: {
                //             value: unit.periodDeviations.value
                //         },
                //         currentPlanFact: {
                //             value: unit.currentPlanFact.value
                //         },
                //         currentPlanPlan: {
                //             value: unit.currentPlanPlan.value
                //         },
                //         periodPlanPlan: {
                //             value: unit.periodPlanPlan.value
                //         },
                //         periodPlanFact: {
                //             value: unit.periodPlanFact.value
                //         },
                //         currentValue: {
                //             value: unit.currentValue.value
                //         },
                //         currentDeviation: {
                //             value: unit.currentDeviation.value
                //         }
                //     };
                //     // this.data = this.chartDataMap(flow.astueFlowGraphs);
                // } else {
                //     this.labels = {
                //         periodCounter: {
                //             value: 0
                //         },
                //         periodDeviations: {
                //             value: 0
                //         },
                //         currentPlanFact: {
                //             value: 0
                //         },
                //         currentPlanPlan: {
                //             value: 0
                //         },
                //         periodPlanPlan: {
                //             value: 0
                //         },
                //         periodPlanFact: {
                //             value: 0
                //         },
                //         currentValue: {
                //             value: 0
                //         },
                //         currentDeviation: {
                //             value: 0
                //         }
                //     };
                //     // this.data = [];
                // }
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    resetLabel(): void {
        this.labels = {
            periodCounter: {
                value: 0
            },
            periodDeviations: {
                value: 0
            },
            currentPlanFact: {
                value: 0
            },
            currentPlanPlan: {
                value: 0
            },
            periodPlanPlan: {
                value: 0
            },
            periodPlanFact: {
                value: 0
            },
            currentValue: {
                value: 0
            },
            currentDeviation: {
                value: 0
            }
        };
    }

    private chartDataMap(data: any): IProductionTrend[] {
        const ret: IProductionTrend[] = [];
        data.forEach((chart) => {
            const mapped: IProductionTrend = {
                graphType: chart.productionTrendStyle,
                graphStyle: chart.chartStyleType,
                graph: []
            };
            chart.values?.forEach((val) => {
                mapped.graph.push({
                    value: val.value,
                    timeStamp: new Date(val.date)
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
