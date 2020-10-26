import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '../../../dashboard/services/widget.service';
import {
    IMultiChartLine,
    IMultiChartTypes
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import {
    AstueOnpzService,
} from '../astue-onpz-shared/astue-onpz.service';
import { IMultiChartOptions } from './components/astue-onpz-multi-chart/astue-onpz-multi-chart.component';
import { HttpClient } from '@angular/common/http';
import { IChartMini } from '@shared/models/smart-scroll.model';


const a: any = {
    graphs: [{
        graph: [{
            value: 158432.54,
            timeStamp: '2020-10-25T03:10:56Z'
        }, { value: 158432.54, timeStamp: '2020-10-25T03:10:56Z' }, {
            value: 153895.65,
            timeStamp: '2020-10-25T03:16:31Z'
        }, { value: 27899.76, timeStamp: '2020-10-25T05:01:31Z' }, {
            value: 1553.58,
            timeStamp: '2020-10-25T05:46:31Z'
        }, { value: 6649.62, timeStamp: '2020-10-25T06:28:01Z' }, {
            value: 46104.12,
            timeStamp: '2020-10-25T07:16:31Z'
        }, { value: 172100.05, timeStamp: '2020-10-25T09:01:31Z' }, {
            value: 198446.37,
            timeStamp: '2020-10-25T09:46:31Z'
        }, { value: 193350.48, timeStamp: '2020-10-25T10:28:01Z' }, {
            value: 153896.1,
            timeStamp: '2020-10-25T11:16:31Z'
        }, { value: 27900.14, timeStamp: '2020-10-25T13:01:31Z' }, {
            value: 1553.68,
            timeStamp: '2020-10-25T13:46:31Z'
        }, { value: 6649.42, timeStamp: '2020-10-25T14:28:01Z' }, {
            value: 46103.66,
            timeStamp: '2020-10-25T15:16:31Z'
        }, { value: 172099.67, timeStamp: '2020-10-25T17:01:31Z' }, {
            value: 198446.27,
            timeStamp: '2020-10-25T17:46:31Z'
        }, { value: 193350.68, timeStamp: '2020-10-25T18:28:01Z' }, {
            value: 153896.58,
            timeStamp: '2020-10-25T19:16:31Z'
        }, { value: 27900.52, timeStamp: '2020-10-25T21:01:31Z' }, {
            value: 1553.77,
            timeStamp: '2020-10-25T21:46:31Z'
        }, { value: 6649.22, timeStamp: '2020-10-25T22:28:01Z' }, {
            value: 46103.2,
            timeStamp: '2020-10-25T23:16:31Z'
        }, { value: 172100.43, timeStamp: '2020-10-21T01:01:31Z' }, {
            value: 198446.47,
            timeStamp: '2020-10-21T01:46:31Z'
        }, { value: 193350.28, timeStamp: '2020-10-21T02:28:01Z' }, {
            value: 153895.65,
            timeStamp: '2020-10-21T03:16:31Z'
        }, { value: 27899.76, timeStamp: '2020-10-21T05:01:31Z' }, {
            value: 21051.62,
            timeStamp: '2020-10-21T05:09:31Z'
        }],
        units: '',
        multiChartTypes: 'fact',
        type: 'FactValue',
        tagName: 'SINUSOIDT-FactValue'
    }, {
        graph: [{
            value: 174275.79400000002,
            timeStamp: '2020-10-25T03:10:56Z'
        }, {
            value: 174275.79400000002,
            timeStamp: '2020-10-25T03:10:56Z'
        }, { value: 169285.215, timeStamp: '2020-10-25T03:16:31Z' }, {
            value: 30689.736,
            timeStamp: '2020-10-25T05:01:31Z'
        }, { value: 1708.938, timeStamp: '2020-10-25T05:46:31Z' }, {
            value: 7314.582,
            timeStamp: '2020-10-25T06:28:01Z'
        }, {
            value: 50714.53200000001,
            timeStamp: '2020-10-25T07:16:31Z'
        }, { value: 189310.055, timeStamp: '2020-10-25T09:01:31Z' }, {
            value: 218291.007,
            timeStamp: '2020-10-25T09:46:31Z'
        }, {
            value: 212685.52800000002,
            timeStamp: '2020-10-25T10:28:01Z'
        }, {
            value: 169285.71000000002,
            timeStamp: '2020-10-25T11:16:31Z'
        }, {
            value: 30690.154000000002,
            timeStamp: '2020-10-25T13:01:31Z'
        }, {
            value: 1709.0480000000002,
            timeStamp: '2020-10-25T13:46:31Z'
        }, {
            value: 7314.362000000001,
            timeStamp: '2020-10-25T14:28:01Z'
        }, {
            value: 50714.026000000005,
            timeStamp: '2020-10-25T15:16:31Z'
        }, {
            value: 189309.63700000002,
            timeStamp: '2020-10-25T17:01:31Z'
        }, {
            value: 218290.897,
            timeStamp: '2020-10-25T17:46:31Z'
        }, {
            value: 212685.74800000002,
            timeStamp: '2020-10-25T18:28:01Z'
        }, {
            value: 169286.238,
            timeStamp: '2020-10-25T19:16:31Z'
        }, {
            value: 30690.572000000004,
            timeStamp: '2020-10-25T21:01:31Z'
        }, {
            value: 1709.1470000000002,
            timeStamp: '2020-10-25T21:46:31Z'
        }, {
            value: 7314.142000000001,
            timeStamp: '2020-10-25T22:28:01Z'
        }, {
            value: 50713.520000000004,
            timeStamp: '2020-10-25T23:16:31Z'
        }, {
            value: 189310.473,
            timeStamp: '2020-10-21T01:01:31Z'
        }, {
            value: 218291.11700000003,
            timeStamp: '2020-10-21T01:46:31Z'
        }, {
            value: 212685.30800000002,
            timeStamp: '2020-10-21T02:28:01Z'
        }, { value: 169285.215, timeStamp: '2020-10-21T03:16:31Z' }, {
            value: 30689.736,
            timeStamp: '2020-10-21T05:01:31Z'
        }, { value: 23156.782, timeStamp: '2020-10-21T05:09:31Z' }],
        units: '',
        multiChartTypes: 'higherBorder',
        type: 'higherBorder',
        tagName: 'SINUSOIDT-higherBorder'
    }, {
        graph: [{
            value: 142589.28600000002,
            timeStamp: '2020-10-25T03:10:56Z'
        }, {
            value: 142589.28600000002,
            timeStamp: '2020-10-25T03:10:56Z'
        }, { value: 138506.085, timeStamp: '2020-10-25T03:16:31Z' }, {
            value: 25109.784,
            timeStamp: '2020-10-25T05:01:31Z'
        }, { value: 1398.222, timeStamp: '2020-10-25T05:46:31Z' }, {
            value: 5984.658,
            timeStamp: '2020-10-25T06:28:01Z'
        }, {
            value: 41493.708000000006,
            timeStamp: '2020-10-25T07:16:31Z'
        }, {
            value: 154890.04499999998,
            timeStamp: '2020-10-25T09:01:31Z'
        }, { value: 178601.733, timeStamp: '2020-10-25T09:46:31Z' }, {
            value: 174015.432,
            timeStamp: '2020-10-25T10:28:01Z'
        }, {
            value: 138506.49000000002,
            timeStamp: '2020-10-25T11:16:31Z'
        }, {
            value: 25110.126,
            timeStamp: '2020-10-25T13:01:31Z'
        }, {
            value: 1398.3120000000001,
            timeStamp: '2020-10-25T13:46:31Z'
        }, { value: 5984.478, timeStamp: '2020-10-25T14:28:01Z' }, {
            value: 41493.294,
            timeStamp: '2020-10-25T15:16:31Z'
        }, {
            value: 154889.703,
            timeStamp: '2020-10-25T17:01:31Z'
        }, {
            value: 178601.64299999998,
            timeStamp: '2020-10-25T17:46:31Z'
        }, { value: 174015.612, timeStamp: '2020-10-25T18:28:01Z' }, {
            value: 138506.922,
            timeStamp: '2020-10-25T19:16:31Z'
        }, { value: 25110.468, timeStamp: '2020-10-25T21:01:31Z' }, {
            value: 1398.393,
            timeStamp: '2020-10-25T21:46:31Z'
        }, {
            value: 5984.298000000001,
            timeStamp: '2020-10-25T22:28:01Z'
        }, { value: 41492.88, timeStamp: '2020-10-25T23:16:31Z' }, {
            value: 154890.387,
            timeStamp: '2020-10-21T01:01:31Z'
        }, { value: 178601.823, timeStamp: '2020-10-21T01:46:31Z' }, {
            value: 174015.252,
            timeStamp: '2020-10-21T02:28:01Z'
        }, { value: 138506.085, timeStamp: '2020-10-21T03:16:31Z' }, {
            value: 25109.784,
            timeStamp: '2020-10-21T05:01:31Z'
        }, { value: 18946.458, timeStamp: '2020-10-21T05:09:31Z' }],
        units: '',
        multiChartTypes: 'lowerBorder',
        type: 'lowerBorder',
        tagName: 'SINUSOIDT-lowerBorder'
    }, {
        graph: [{
            value: 174275.79,
            timeStamp: '2020-10-25T03:10:56Z'
        }, { value: 174275.79, timeStamp: '2020-10-25T03:10:56Z' }, {
            value: 169285.21,
            timeStamp: '2020-10-25T03:16:31Z'
        }, { value: 30689.74, timeStamp: '2020-10-25T05:01:31Z' }, {
            value: 1708.94,
            timeStamp: '2020-10-25T05:46:31Z'
        }, { value: 7314.58, timeStamp: '2020-10-25T06:28:01Z' }, {
            value: 50714.53,
            timeStamp: '2020-10-25T07:16:31Z'
        }, { value: 189310.06, timeStamp: '2020-10-25T09:01:31Z' }, {
            value: 218291,
            timeStamp: '2020-10-25T09:46:31Z'
        }, { value: 212685.53, timeStamp: '2020-10-25T10:28:01Z' }, {
            value: 169285.71,
            timeStamp: '2020-10-25T11:16:31Z'
        }, { value: 30690.15, timeStamp: '2020-10-25T13:01:31Z' }, {
            value: 1709.04,
            timeStamp: '2020-10-25T13:46:31Z'
        }, { value: 7314.36, timeStamp: '2020-10-25T14:28:01Z' }, {
            value: 50714.03,
            timeStamp: '2020-10-25T15:16:31Z'
        }, { value: 189309.64, timeStamp: '2020-10-25T17:01:31Z' }, {
            value: 218290.9,
            timeStamp: '2020-10-25T17:46:31Z'
        }, { value: 212685.75, timeStamp: '2020-10-25T18:28:01Z' }, {
            value: 169286.23,
            timeStamp: '2020-10-25T19:16:31Z'
        }, { value: 30690.57, timeStamp: '2020-10-25T21:01:31Z' }, {
            value: 1709.15,
            timeStamp: '2020-10-25T21:46:31Z'
        }, { value: 7314.15, timeStamp: '2020-10-25T22:28:01Z' }, {
            value: 50713.51,
            timeStamp: '2020-10-25T23:16:31Z'
        }, { value: 189310.48, timeStamp: '2020-10-21T01:01:31Z' }, {
            value: 218291.12,
            timeStamp: '2020-10-21T01:46:31Z'
        }, { value: 212685.31, timeStamp: '2020-10-21T02:28:01Z' }, {
            value: 169285.21,
            timeStamp: '2020-10-21T03:16:31Z'
        }, { value: 30689.74, timeStamp: '2020-10-21T05:01:31Z' }, {
            value: 23156.78,
            timeStamp: '2020-10-21T05:09:31Z'
        }],
        units: '',
        multiChartTypes: 'plan',
        type: 'PlanValue',
        tagName: 'SINUSOIDT-PlanValue'
    }]
};

@Component({
    selector: 'evj-astue-onpz-conventional-fuel',
    templateUrl: './astue-onpz-conventional-fuel.component.html',
    styleUrls: ['./astue-onpz-conventional-fuel.component.scss']
})
export class AstueOnpzConventionalFuelComponent extends WidgetPlatform implements OnInit, OnDestroy {

    public data: IMultiChartLine[] = [];
    public colors: Map<string, number>;
    public unitName: string = '';

    public isPredictors: boolean = false;
    public options: IMultiChartOptions = {
        isIconsShowing: false
    };

    public sbWidth: number = 100;
    public sbLeft: number = 0;
    public scrollLimits: IDatesInterval = null;

    get planningChart(): boolean {
        return !!this.astueOnpzService.sharedPlanningGraph$.getValue();
    }

    get scrollData(): IChartMini[] {
        return this.data?.find((x) => x.graphType === 'plan')?.graph ?? [];
    }

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService,
        private userSettingsService: UserSettingsService,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.widgetInit();

        this.data = !!a ? this.multilineDataMapper(a.graphs) : [];

        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => this.scrollLimits = ref),
        );
        // this.http
        //     .get('assets/mock/ASTUE-ONPZ/multiline-chart-plant.mock.json')
        //     .subscribe((data: any) => {
        //         data.data.graphs.forEach((item: IMultiChartLine) => {
        //             item.graphType = (item as any).multiChartTypes;
        //             item.graph.forEach((val) => {
        //                 val.timeStamp = new Date(val.timeStamp);
        //             });
        //         });
        //         // data.data.graphs = data.data.graphs.filter(
        //         //     (item: IMultiChartLine) => item.graphType === 'fact'
        //         // );
        //         this.data = data.data.graphs;
        //         console.log('mock-data:', data.data);
        //     });
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.isPredictors = this.widgetType === 'astue-onpz-conventional-fuel-predictors';
        this.options.isIconsShowing = !this.isPredictors;
        this.subscriptions.push(
                this.astueOnpzService.multilineChartIndicatorTitle$.subscribe((title) => {
                    if (this.isPredictors) {
                        return;
                    }
                    this.widgetTitle = title;
                }),
                this.astueOnpzService.sharedIndicatorOptions.subscribe((options) => {
                    if (this.isPredictors) {
                        return;
                    }
                    this.unitName = options.unitName;
                    this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, options);
                }),
                this.astueOnpzService.multiLinePredictors.subscribe((data) => {
                    if (!this.isPredictors) {
                        return;
                    }
                    this.data = !!data ? this.multilineDataMapper(data) : [];
                }),
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.dropDataStream();
        this.astueOnpzService.sharedPlanningGraph$.next(null);
        this.astueOnpzService.multilineChartIndicatorTitle$.next('');
    }

    protected dataHandler(ref: { graphs: IMultiChartLine[] }): void {
        if (!this.isPredictors) {
            if (ref?.graphs) {
                this.data = this.multilineDataMapper(ref.graphs);
                return;
            }
            this.data = [];
        }
    }

    public goToMainScreen(): void {
        this.userSettingsService.LoadScreenByWidget('astue-onpz-menu-structure');
    }

    private multilineDataMapper(ref: IMultiChartLine[]): IMultiChartLine[] {
        ref?.forEach((graph) => {
            const _ = graph as any;
            graph.graphType = graph.graphType ?? _.multiChartTypes;
            graph.graph?.forEach((item) => {
                item.timeStamp = new Date(item.timeStamp);
            });
        });
        return ref;
    }
}
