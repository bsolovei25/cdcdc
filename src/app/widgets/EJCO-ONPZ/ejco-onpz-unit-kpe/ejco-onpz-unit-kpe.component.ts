import {
    Component,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { EjcoOnpzHelperService } from '../ejco-onpz-shared/ejco-onpz-helper.service';

interface IChart {
    title: string;
    fact: number;
    plan: number;
    deviation: number;
}

export interface IEjcoOnpzUnitKpe {
    chartData: IChart;
    chartCards: IChart[];
}

@Component({
    selector: 'evj-ejco-onpz-unit-kpe',
    templateUrl: './ejco-onpz-unit-kpe.component.html',
    styleUrls: ['./ejco-onpz-unit-kpe.component.scss']
})
export class EjcoOnpzUnitKpeComponent extends WidgetPlatform<unknown> implements OnDestroy, AfterViewInit {

    public data: IEjcoOnpzUnitKpe = { chartData: null, chartCards: null };

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
        console.log(unitCaption);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IEjcoOnpzUnitKpe): void {
        if (this.ejcoOnpzHelperService.compareArrayOfObjects<IChart>(
            this.data.chartCards,
            ref.chartCards,
        )) {
            this.data.chartCards = ref.chartCards;
        }
        this.data.chartData = ref.chartData;
    }
}
