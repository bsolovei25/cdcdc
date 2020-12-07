import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IBarDiagramData } from '../shared/kpe-equalizer-chart/kpe-equalizer-chart.component';
import { enforceabilityGraphData } from '../kpe-plan-enforceability/mock';
@Component({
  selector: 'evj-kpe-plan-enforceability',
  templateUrl: './kpe-plan-enforceability.component.html',
  styleUrls: ['./kpe-plan-enforceability.component.scss']
})

export class KpePlanEnforceabilityComponent extends WidgetPlatform<unknown> implements OnInit {
  graphData: IBarDiagramData[];

  constructor(
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  public ngOnInit(): void {
    super.widgetInit();
    this.graphData = enforceabilityGraphData;
  }

  protected dataHandler(ref: any): void {
  }

  public chartHeight(container: HTMLDivElement): string {
    if (!(container?.offsetHeight > 0)) {
      return;
    }
    const height = container.offsetHeight;
    return `height: ${height * 0.6}px`;
}
}
