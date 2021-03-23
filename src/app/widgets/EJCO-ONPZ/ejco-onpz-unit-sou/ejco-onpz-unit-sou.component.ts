import { Component, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { EjcoOnpzHelperService } from '../ejco-onpz-shared/ejco-onpz-helper.service';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';

export interface IEjcoOnpzUnit {
    caption: string;
}

export interface IEjcoOnpzUnitSou {
    chartData: { title: string; fact: number; plan: number; deviation?: number }[];
    data: IEjcoOnpzUnitSouTableRow[];
}

export interface IEjcoOnpzUnitSouTableRow {
    title: string;
    values: IEjcoOnpzUnitSouTableRow[];
}

@Component({
    selector: 'evj-ejco-onpz-unit-sou',
    templateUrl: './ejco-onpz-unit-sou.component.html',
    styleUrls: ['./ejco-onpz-unit-sou.component.scss'],
})
export class EjcoOnpzUnitSouComponent extends WidgetPlatform<unknown> implements OnDestroy, AfterViewInit {
    public tabs: IEjcoOnpzUnit[] = [];

    public data: IEjcoOnpzUnitSou = { chartData: null, data: null };

    public tableData: IEjcoOnpzUnitSouTableRow[] = [];

    public widgetIcon: string = 'ejco';

    public currentTab: string;

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
        this.userSettingsService.loadScreenByWidget('sou-operational-accounting-system');
        return;
    }

    public toggleTab(unitCaption: string): void {
        this.tableData = this.data.data.find((item) => item.title === unitCaption)?.values;
        this.currentTab = unitCaption;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IEjcoOnpzUnitSou): void {
        if (this.ejcoOnpzHelperService.compareArrayOfObjects(this.data.chartData, ref.chartData)) {
            this.data.chartData = ref.chartData;
        }
        const tabs = [];
        ref.data.forEach((item) => tabs.push({ caption: item.title }));
        if (this.ejcoOnpzHelperService.compareArrayOfObjects(this.tabs, tabs)) {
            this.tabs = tabs.sort((a, b) => {
                const textA = a.caption.toUpperCase();
                const textB = b.caption.toUpperCase();
                return textA.localeCompare(textB);
            });
        }
        this.data.data = ref.data;
        this.toggleTab(this.tabs[0]?.caption);
    }
}
