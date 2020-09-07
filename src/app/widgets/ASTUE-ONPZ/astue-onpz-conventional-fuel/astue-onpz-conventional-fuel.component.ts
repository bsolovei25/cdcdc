import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';

@Component({
    selector: 'evj-astue-onpz-conventional-fuel',
    templateUrl: './astue-onpz-conventional-fuel.component.html',
    styleUrls: ['./astue-onpz-conventional-fuel.component.scss'],
})
export class AstueOnpzConventionalFuelComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    public data: IMultiChartLine[] = [];

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
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedIndicatorOptions.subscribe((options) => {
                if (!options?.filterValues) {
                    return;
                }
                this.widgetService.setWidgetLiveDataFromWSOptions(this.widgetId, options);
            }),
            this.astueOnpzService.predictorsOptions$.subscribe((options) => {
                this.widgetService.setWidgetLiveDataFromWSOptions(this.widgetId, options);
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.dropDataStream();
    }

    protected dataHandler(ref: { graphs: IMultiChartLine[] }): void {
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

    public goToMainScreen(): void {
        this.userSettingsService.LoadScreenByWidget('astue-onpz-menu-structure');
    }
}
