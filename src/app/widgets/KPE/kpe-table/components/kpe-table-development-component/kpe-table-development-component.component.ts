import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IKpeTable, IKpeTableHeader, IKpeTableTabs } from '../../kpe-table.component';
import { tableHeader } from '../kpe-table-mock';
import { SelectionModel } from '@angular/cdk/collections';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { ChannelPlatform } from 'src/app/dashboard/models/@PLATFORM/channel-platform';
import { BehaviorSubject } from 'rxjs';
import { KpeTableService } from '../../services/kpe-table.service';

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
    public averageConsumption: {id: number, value: string}[] = [
        { id: 0, value: 'Ср. расход на дату тн' },
        { id: 1, value: 'Ср. расход на дату м3' }
      ]

    public instantConsumption: {id: number, value: string}[] = [
        { id: 0, value: 'Мгновенный расход на дату тн' },
        { id: 1, value: 'Мгновенный на дату м3' }
      ]

    public data$: BehaviorSubject<IKpeTable[]> = new BehaviorSubject<IKpeTable[]>([]);
    public columnsToDisplay: IKpeTableHeader[] = tableHeader;
    public search: string = '';

    public expandedElement: SelectionModel<string> = new SelectionModel(true);
    public selectedRowProduct: string;
    public selectedRow: SelectionModel<string> = new SelectionModel(true);
    public selectAverageUnit: number = 0;
    public selectInstantUnit: number = 0;


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
        this.kpeTableService.selectAverageUnit$.subscribe((value) => {
            this.selectAverageUnit = value;
        });
        this.kpeTableService.selectInstantUnit$.subscribe((value) => {
            this.selectInstantUnit = value;
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
