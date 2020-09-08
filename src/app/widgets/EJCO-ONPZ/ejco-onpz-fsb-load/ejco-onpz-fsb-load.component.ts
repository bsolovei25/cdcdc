import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {HttpClient} from '@angular/common/http';


export interface IEjcoOnpzUnitSou {
    chartData: { label: string, fact: number, plan: number };
    data: IEjcoOnpzUnitSouTableRow[];
}

export interface IEjcoOnpzUnitSouTableRow {
    title: string;
    values: string[];
}

@Component({
    selector: 'evj-ejco-onpz-fsb-load',
    templateUrl: './ejco-onpz-fsb-load.component.html',
    styleUrls: ['./ejco-onpz-fsb-load.component.scss']
})
export class EjcoOnpzFsbLoadComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {

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
        this.data = await this.http.get<any>('assets/mock/EJCO/ejco-fsb-load.json').toPromise();
        return this.data;
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        console.log(ref);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
