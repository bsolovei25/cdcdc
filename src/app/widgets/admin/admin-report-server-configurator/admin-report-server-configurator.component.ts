import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

@Component({
  selector: 'evj-admin-report-server-configurator',
  templateUrl: './admin-report-server-configurator.component.html',
  styleUrls: ['./admin-report-server-configurator.component.scss']
})
export class AdminReportServerConfiguratorComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

  constructor(
    protected widgetService: WidgetService,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, id, uniqId);
  }

  ngOnInit(): void {
    super.widgetInit();
  }

  ngOnDestroy(): void {

  }

  protected dataHandler(ref: any) {

  }
}
