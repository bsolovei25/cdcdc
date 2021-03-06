import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IBarDiagramData } from '../shared/kpe-equalizer-chart/kpe-equalizer-chart.component';
import { enforceabilityGraphData } from './mock';
@Component({
    selector: 'evj-kpe-plan-enforceability',
    templateUrl: './kpe-plan-enforceability.component.html',
    styleUrls: ['./kpe-plan-enforceability.component.scss'],
})
export class KpePlanEnforceabilityComponent extends WidgetPlatform<unknown> implements OnInit {
    graphData: IBarDiagramData[];

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.graphData = enforceabilityGraphData;
    }

    public chartWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `width: ${height}px`;
    }

    protected dataHandler(ref: any): void {}
}
