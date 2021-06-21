import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITrendAnalysisGraphData } from '@widgets/EC/ec-widget-trend-analysis-graph/ec-widget-trend-analysis-graph.component';

@Component({
    selector: 'evj-ec-widget-trend-analysis-chart-list',
    templateUrl: './ec-widget-trend-analysis-chart-list.component.html',
    styleUrls: ['./ec-widget-trend-analysis-chart-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetTrendAnalysisChartListComponent {
    @Input() data: ITrendAnalysisGraphData[] = [];

    @Output() toggleChartItem: EventEmitter<string> = new EventEmitter<string>();

    public OnClickChartItem(name: string): void {
        this.toggleChartItem.emit(name);
    }
}
