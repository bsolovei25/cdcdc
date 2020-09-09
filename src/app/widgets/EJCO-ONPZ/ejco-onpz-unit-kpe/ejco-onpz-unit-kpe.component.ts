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

export interface IEjcoOnpzUnitKpe {
    chartData: { label: string, fact: number, plan: number };
    chartCards: { label: string, fact: number, plan: number }[];
}

@Component({
    selector: 'evj-ejco-onpz-unit-kpe',
    templateUrl: './ejco-onpz-unit-kpe.component.html',
    styleUrls: ['./ejco-onpz-unit-kpe.component.scss']
})
export class EjcoOnpzUnitKpeComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {

    public data: IEjcoOnpzUnitKpe;

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

    public async mockDataConnect(): Promise<IEjcoOnpzUnitKpe> {
        this.data = await this.http.get<IEjcoOnpzUnitKpe>('assets/mock/EJCO/ejco-unit-kpe.json').toPromise();
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
