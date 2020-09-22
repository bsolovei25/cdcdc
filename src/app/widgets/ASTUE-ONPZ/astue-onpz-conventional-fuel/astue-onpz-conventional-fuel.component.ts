import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IMultiChartLine,
    IMultiChartTypes,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { IMultiChartOptions } from './components/astue-onpz-multi-chart/astue-onpz-multi-chart.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-astue-onpz-conventional-fuel',
    templateUrl: './astue-onpz-conventional-fuel.component.html',
    styleUrls: ['./astue-onpz-conventional-fuel.component.scss'],
})
export class AstueOnpzConventionalFuelComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    public data: IMultiChartLine[] = [];
    colors: Map<string, number>;

    public isPredictors: boolean = false;
    public options: IMultiChartOptions = {
        isIconsShowing: false,
    };

    get planningChart(): boolean {
        return !!this.astueOnpzService.sharedPlanningGraph$.getValue();
    }

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService,
        private userSettingsService: UserSettingsService,
        private http: HttpClient
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.widgetInit();

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
                this.widgetService.setWidgetLiveDataFromWSOptions(this.widgetId, options);
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
        ref.forEach((graph) => {
            const _ = graph as any;
            graph.graphType = graph.graphType ?? _.multiChartTypes;
            graph.graph.forEach((item) => {
                item.timeStamp = new Date(item.timeStamp);
            });
        });
        return ref;
    }
}
