import {
    Component,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {EjcoOnpzHelperService} from '../ejco-onpz-shared/ejco-onpz-helper.service';


export interface IEjcoOnpzFsbLoad {
    chartData: { title: string, fact: number, plan: number, deviation: number };
    data: IEjcoOnpzFsbLoadData[];
}

export interface IEjcoOnpzFsbLoadData {
    title: string;
    values: string[];
}

@Component({
    selector: 'evj-ejco-onpz-fsb-load',
    templateUrl: './ejco-onpz-fsb-load.component.html',
    styleUrls: ['./ejco-onpz-fsb-load.component.scss']
})
export class EjcoOnpzFsbLoadComponent extends WidgetPlatform<unknown> implements OnDestroy, AfterViewInit {

    public data: IEjcoOnpzFsbLoad = { chartData: null, data: null };

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

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IEjcoOnpzFsbLoad): void {
        if (this.ejcoOnpzHelperService.compareObjects(this.data.chartData, ref.chartData)) {
            this.data.chartData = ref.chartData;
        }
        this.data.data = ref.data;
    }
}
