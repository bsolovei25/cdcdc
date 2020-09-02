import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';

export type AstueOnpzConsumptionIndicatorsWidgetType = 'Deviation' | 'Consumption';

export type AstueOnpzConsumptionIndicatorType = 'Money' | 'Percent' | 'Absolute';

interface IAstueOnpzConsumptionIndicators {
    title: string;
    widgetType: string;
    type?: AstueOnpzConsumptionIndicatorsWidgetType;
    indicators: IAstueOnpzIndicator[];
}

export interface IAstueOnpzIndicator {
    caption: string;
    type: AstueOnpzConsumptionIndicatorType;
    value?: number;
}

@Component({
    selector: 'evj-astue-onpz-consumption-indicators',
    templateUrl: './astue-onpz-consumption-indicators.component.html',
    styleUrls: ['./astue-onpz-consumption-indicators.component.scss'],
})
export class AstueOnpzConsumptionIndicatorsComponent extends WidgetPlatform
    implements OnInit, OnDestroy, AfterViewInit {

    public type: AstueOnpzConsumptionIndicatorsWidgetType;

    public activeIndicator: IAstueOnpzIndicator | null;

    public indicators: IAstueOnpzIndicator[] = [];

    constructor(
        public widgetService: WidgetService,
        public astueOnpzService: AstueOnpzService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: IAstueOnpzConsumptionIndicators): void {
        this.indicators = ref.indicators;
        this.type = ref.type;
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedMonitoringOptions.subscribe(options => {
                this.activeIndicator = null;
                if (this.indicators) {
                    const indicator = this.indicators.find(indicatorFromList => indicatorFromList.type === options.indicatorType);
                    if (options.type === this.type) {
                        this.activeIndicator = indicator;
                    }
                }
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public setIndicator(indicator: IAstueOnpzIndicator): void {
        this.astueOnpzService.updateIndicator(indicator.type, this.type);
    }
}
