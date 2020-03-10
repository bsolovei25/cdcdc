import {Component, Inject, OnDestroy, AfterViewInit} from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { NewUserSettingsService } from 'src/app/dashboard/services/new-user-settings.service';
import {WidgetPlatform} from '../../../models/widget-platform';

@Component({
    selector: 'evj-bar-charts',
    templateUrl: './bar-charts.component.html',
    styleUrls: ['./bar-charts.component.scss'],
})
export class BarChartsComponent extends WidgetPlatform implements AfterViewInit, OnDestroy {

    public data: any[] = [];

    constructor(
        private userSettings: NewUserSettingsService,
        protected widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);

        this.widgetIcon = 'valve';
        this.itemCols = 24;
        this.itemRows = 10;
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.chartItems;
    }

    public onRemoveButton(): void {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }
}
