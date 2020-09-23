import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';

export interface IEjcoOnpzUnit {
    caption: string;
}

export interface IEjcoOnpzUnitSou {
    chartData: { label: string, fact: number, plan: number }[];
    data: IEjcoOnpzUnitSouTableRow[];
}

export interface IEjcoOnpzUnitSouTableRow {
    title: string;
    values: string[];
}

@Component({
    selector: 'evj-ejco-onpz-unit-sou',
    templateUrl: './ejco-onpz-unit-sou.component.html',
    styleUrls: ['./ejco-onpz-unit-sou.component.scss']
})
export class EjcoOnpzUnitSouComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {

    public tabs: IEjcoOnpzUnit[] = [
        {
            caption: 'АВТ-10 АБ',
        },
        {
            caption: 'АВТ-11 АБ',
        },
    ];

    public data: IEjcoOnpzUnitSou;

    public widgetIcon: string = 'ejco';

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.mockDataConnect();
    }

    public async mockDataConnect(): Promise<any> {
        this.data = await this.http.get<any>('assets/mock/EJCO/ejco-unit-sou.json').toPromise();
        return this.data;
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    public handleTabClick(unitCaption: string | null): void {
        if (!unitCaption) {
            console.log('В источник');
            return;
        }
        console.log(unitCaption);
    }

    protected dataHandler(ref: any): void {
        console.log(ref);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
