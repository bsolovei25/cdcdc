import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IParams } from '../../CD/cd-mat-balance/cd-mat-balance.component';
import { heatBalanceData } from '../../ASTUE-ONPZ/astue-onpz-heat-balance/astue-onpz-heat-balance-mock';
import { IColumnsToDisplay } from '../aps-recipe-diagram/aps-recipe-diagram.component';

export interface IStructure {
    unit: { name: string };
    list: IStructureList[];
}

export interface IStructureList {
    id: string;
    name: string;
}

@Component({
    selector: 'evj-aps-structure-id',
    templateUrl: './aps-structure-id.component.html',
    styleUrls: ['./aps-structure-id.component.scss']
})
export class ApsStructureIdComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IStructure[] = [{
        unit: { name: 'Технологическая устрановка' },
        list: [
            {
                id: '0',
                name: 'Справочник'
            },
            {
                id: '1',
                name: 'Режимы работы ТУ'
            },
            {
                id: '2',
                name: 'Скорость изменнеия загрузки'
            }
            ,
            {
                id: '3',
                name: 'Диапазон производительности по регламенту'
            }
            ]
    },
        {
            unit: { name: 'Материальный поток' },
            list: [
                {
                    id: '00',
                    name: 'Справочник'
                },
                {
                    id: '11',
                    name: 'Режимы работы ТУ'
                },
                {
                    id: '22',
                    name: 'Скорость изменнеия загрузки'
                }
                ,
                {
                    id: '33',
                    name: 'Диапазон производительности по регламенту'
                }
            ]
        }
    ];
    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Показатели, Дж', id: 0, date: new Date() }
    ];

    expandedElement: SelectionModel<string> = new SelectionModel(true);
    selectedRowProduct: string;
    selectedRow: SelectionModel<string> = new SelectionModel(true);

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
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
}
