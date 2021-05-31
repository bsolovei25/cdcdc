import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';

@Component({
    selector: 'evj-admin-report-server-configurator',
    templateUrl: './admin-report-server-configurator.component.html',
    styleUrls: ['./admin-report-server-configurator.component.scss'],
})
export class AdminReportServerConfiguratorComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public tabs: string[] = ['Конфигуратор сервера отчетов', 'Работа с файлами'];

    constructor(
        protected widgetService: WidgetService,
        public adminReportConfiguratorService: AdminReportConfiguratorService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
    }

    protected dataHandler(ref: any): void {
    }

    public changeTab(tabIndex: number): void {
        this.adminReportConfiguratorService.currentTab.next(tabIndex);
    }
}
