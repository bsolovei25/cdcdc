import {
    Component,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { EjcoOnpzHelperService } from '../ejco-onpz-shared/ejco-onpz-helper.service';

export interface IEjcoOnpzUnit {
    caption: string;
}

export interface IEjcoOnpzUnitSou {
    chartData: { title: string, fact: number, plan: number, deviation?: number }[];
    data: IEjcoOnpzUnitSouTableRow[];
}

export interface IEjcoOnpzUnitSouTableRow {
    title: string;
    values: IEjcoOnpzUnitSouTableRow[];
}

@Component({
    selector: 'evj-ejco-onpz-unit-sou',
    templateUrl: './ejco-onpz-unit-sou.component.html',
    styleUrls: ['./ejco-onpz-unit-sou.component.scss']
})
export class EjcoOnpzUnitSouComponent extends WidgetPlatform implements OnDestroy, AfterViewInit {

    public tabs: IEjcoOnpzUnit[] = [];

    public data: IEjcoOnpzUnitSou = { chartData: null, data: null };

    public tableData: IEjcoOnpzUnitSouTableRow[] = [];

    public widgetIcon: string = 'ejco';

    constructor(
        public widgetService: WidgetService,
        public ejcoOnpzHelperService: EjcoOnpzHelperService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    public handleTabClick(unitCaption: string | null): void {
        if (!unitCaption) {
            console.log('В источник');
            return;
        }
        this.tableData = this.data.data.find(item => item.title === unitCaption).values;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IEjcoOnpzUnitSou): void {
        if (this.ejcoOnpzHelperService.compareArrayOfObjects(this.data.chartData, ref.chartData)) {
            this.data.chartData = ref.chartData;
        }
        const tabs = [];
        ref.data.forEach(item => tabs.push({ caption: item.title }));
        if (this.ejcoOnpzHelperService.compareArrayOfObjects(this.tabs, tabs)) {
            this.tabs = tabs;
        }
        this.data.data = ref.data;
    }
}
