import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { WidgetPlatform } from "../../../dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "../../../dashboard/services/widget.service";
import {QUALITY_DATA, QUALITY_HEADERS } from "./mock";

@Component({
    selector: 'evj-kpe-quality-reserve-table',
    templateUrl: './kpe-quality-reserve-table.component.html',
    styleUrls: ['./kpe-quality-reserve-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpeQualityReserveTableComponent extends WidgetPlatform<unknown> implements OnInit {
    public tabsList: string[] = [
        'Запас по качеству (от ПП)',
        'Запас по качеству (от НД)',
        'План производства',
        'Нормативная документация',
        'Факт',
    ];
    public currentTab: number = 1;

    public displayedColumns: string[] = Object.keys(QUALITY_HEADERS);
    public header: object = QUALITY_HEADERS
    public data: object[] = QUALITY_DATA;

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public changeTab(tabNumber: number): void {
        this.currentTab = tabNumber;
    }

    protected dataHandler(ref: any): void {}
}
