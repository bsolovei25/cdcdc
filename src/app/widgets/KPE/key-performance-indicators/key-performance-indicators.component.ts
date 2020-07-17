import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IKpeGaugeChartInputData } from './components/gauge-diagram/gauge-diagram.component';

export interface ITruncatedDiagramInputData {
    name: string;
    items: IKpeGaugeChartInputData;
}

@Component({
    selector: 'evj-kpe-key-performance-indicators',
    templateUrl: './key-performance-indicators.component.html',
    styleUrls: ['./key-performance-indicators.component.scss'],
})
export class KeyPerformanceIndicatorsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: ITruncatedDiagramInputData;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    private processData(): void {
    }

    protected dataHandler(ref: any): void {
        this.data = ref.groups;
        this.processData();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
