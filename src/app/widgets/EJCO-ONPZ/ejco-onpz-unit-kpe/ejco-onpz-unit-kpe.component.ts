import { Component, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { EjcoOnpzHelperService } from '../ejco-onpz-shared/ejco-onpz-helper.service';
import { UserSettingsService } from "../../../dashboard/services/user-settings.service";

interface IChart {
    title: string;
    fact: number;
    plan: number;
    deviation: number;
}

export interface IEjcoOnpzUnitKpe {
    chartData: IChart;
    chartCards: IChart[];
}

@Component({
    selector: 'evj-ejco-onpz-unit-kpe',
    templateUrl: './ejco-onpz-unit-kpe.component.html',
    styleUrls: ['./ejco-onpz-unit-kpe.component.scss'],
})
export class EjcoOnpzUnitKpeComponent extends WidgetPlatform<unknown> implements OnDestroy, AfterViewInit {
    public data: IEjcoOnpzUnitKpe = { chartData: null, chartCards: null };

    public widgetIcon: string = 'ejco';

    constructor(
        public widgetService: WidgetService,
        public ejcoOnpzHelperService: EjcoOnpzHelperService,
        private userSettingsService: UserSettingsService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    public handleTabClick(): void {
        this.userSettingsService.loadScreenBySetOfWidgetType(['key-performance-indicators', 'kpe-energetic', 'kpe-quality', 'kpe-readiness', 'kpe-safety']);
        return;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IEjcoOnpzUnitKpe): void {
        if (this.ejcoOnpzHelperService.compareArrayOfObjects<IChart>(this.data.chartCards, ref.chartCards)) {
            this.data.chartCards = ref.chartCards;
        }
        this.data.chartData = ref.chartData;
    }
}
