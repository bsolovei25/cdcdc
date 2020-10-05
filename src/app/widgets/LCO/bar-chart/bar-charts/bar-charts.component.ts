import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
import { WidgetPlatform } from '../../../../dashboard/models/widget-platform';

@Component({
    selector: 'evj-bar-charts',
    templateUrl: './bar-charts.component.html',
    styleUrls: ['./bar-charts.component.scss'],
})
export class BarChartsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: any[] = [];

    constructor(
        private userSettings: UserSettingsService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'valve';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.chartItems;
    }

    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
        // this.widgetService.removeItemService(this.uniqId);
    }
}
