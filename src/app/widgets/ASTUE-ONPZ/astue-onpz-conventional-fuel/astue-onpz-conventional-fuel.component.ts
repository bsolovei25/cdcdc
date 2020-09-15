import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { IMultiChartOptions } from './components/astue-onpz-multi-chart/astue-onpz-multi-chart.component';

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
        private userSettingsService: UserSettingsService
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        console.log(this.widgetType);
        this.isPredictors = this.widgetType === 'astue-onpz-conventional-fuel-predictors';
        this.subscriptions.push(
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
                if (!!data) {
                    this.data = data;
                    this.data.forEach((item) => {
                        item.graph?.forEach((val) => (val.timeStamp = new Date(val.timeStamp)));
                    });
                } else {
                    this.data = [];
                }
            }),
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.dropDataStream();
    }

    protected dataHandler(ref: { graphs: IMultiChartLine[] }): void {
        if (!this.isPredictors) {
            if (ref?.graphs) {
                ref.graphs.forEach((graph) => {
                    const _ = graph as any;
                    graph.graphType = _.multiChartTypes;
                    graph.graph.forEach((item) => {
                        item.timeStamp = new Date(item.timeStamp);
                    });
                });
                this.data = ref?.graphs;
                return;
            }
            this.data = [];
        }
    }

    public goToMainScreen(): void {
        this.userSettingsService.LoadScreenByWidget('astue-onpz-menu-structure');
    }
}
