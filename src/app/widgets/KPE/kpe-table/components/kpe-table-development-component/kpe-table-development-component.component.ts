import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IKpeTable, IKpeTableHeader, IKpeTableTabs } from '../../kpe-table.component';
import { tableHeader } from '../kpe-table-mock';
import { SelectionModel } from '@angular/cdk/collections';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { ChannelPlatform } from 'src/app/dashboard/models/@PLATFORM/channel-platform';
import { BehaviorSubject } from 'rxjs';
import { KpeTableService } from '../../services/kpe-table.service';
import { IHeadersSelectors, IUnits } from '@dashboard/models/KPE/kpe-table.model';

export interface IKpeTableData {
    allTabs: IKpeTableTabs[],
    groups: IKpeTable[],
    isHistoricalDataSupported: boolean,
    title: string,
    widgetType: string
}

@Component({
    selector: 'evj-kpe-table-development-component',
    templateUrl: './kpe-table-development-component.component.html',
    styleUrls: ['./kpe-table-development-component.component.scss'],
})
export class KpeTableDevelopmentComponentComponent extends ChannelPlatform<IKpeTableData> implements OnInit, OnDestroy {

    public headerSelectors: IHeadersSelectors = {
        averageConsumption: [
            { id: 0, value: 'Ср. расход на дату, т' },
            { id: 1, value: 'Ср. расход на дату, м3' }
        ],
        instantConsumption: [
            { id: 0, value: 'Мгновенный расход на дату, т' },
            { id: 1, value: 'Мгновенный расход на дату, м3' }
        ],
        plan: [
            { id: 0, value: 'План, т' },
            { id: 1, value: 'План, м3'}
        ],
        valuePlan: [
            { id: 0, value: 'Плановый расход, т/ч' },
            { id: 1, value: 'Плановый расход, м3/ч' },
        ],
        total: [
            { id: 0, value: 'Накопление, т' },
            { id: 1, value: 'Накопление, м3' },
        ],
        prediction: [
            { id: 0, value: 'Прогноз на 03:00, т' },
            { id: 1, value: 'Прогноз на 03:00, м3' },
        ],
        deviation: [
            { id: 0, value: 'т' },
            { id: 1, value: 'м3' },
        ],
        valueRecommended: [
            { id: 0, value: 'Рек. расход, т/ч' },
            { id: 1, value: 'Рек. расход, м3/ч' },
        ]
    }

    public data$: BehaviorSubject<IKpeTable[]> = new BehaviorSubject<IKpeTable[]>([]);
    public columnsToDisplay: IKpeTableHeader[] = tableHeader;
    public search: string = '';

    public expandedElement: SelectionModel<string> = new SelectionModel(true);
    public selectedRowProduct: string;
    public selectedRow: SelectionModel<string> = new SelectionModel(true);

    public chosenUnits: IUnits = {
        averageUnit: 0,
        instantUnit: 0,
        planUnit: 0,
        valuePlanUnit: 0,
        totalUnit: 0,
        predictionUnit: 0,
        valueRecommended: 0,
        deviationUnits: 0
    }

    constructor(
        protected widgetService: WidgetService,
        private kpeTableService: KpeTableService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.kpeTableService.chosenUnits$.subscribe((chosenUnits) => {
            this.chosenUnits = chosenUnits;
        })
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IKpeTableData): void {
        this.data$.next(ref.groups);
    }

    onClickTr(event: MouseEvent, element: any): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.name !== this.selectedRowProduct) {
            this.selectedRowProduct = element.name;
        } else {
            this.selectedRowProduct = null;
        }
    }
    onClickRowChildren(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.id !== this.selectedRowProduct) {
            this.selectedRowProduct = element.id;
        } else {
            this.selectedRowProduct = null;
        }
    }

    trackByFn(element) {
        return element.id;
     }
}
