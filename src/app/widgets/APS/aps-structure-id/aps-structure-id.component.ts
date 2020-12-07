import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IColumnsToDisplay } from '../aps-recipe-diagram/aps-recipe-diagram.component';
import { structureList } from './aps-structure-id-mock';
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';

export interface IStructure {
    unit: { name: string };
    list: IStructureList[];
}

export interface IStructureList {
    title: string;
    id: string;
    unitType?: number;
}

@Component({
    selector: 'evj-aps-structure-id',
    templateUrl: './aps-structure-id.component.html',
    styleUrls: ['./aps-structure-id.component.scss'],
})
export class ApsStructureIdComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IStructure[] = structureList;
    columnsToDisplay: IColumnsToDisplay[] = [{ name: 'Показатели, Дж', id: 0, date: new Date() }];

    expandedElement: SelectionModel<string> = new SelectionModel(true);
    selectedRowProduct: string;
    selectUnitType: number;
    selectedRow: SelectionModel<string> = new SelectionModel(true);
    constructor(
        private apsService: ApsService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.apsService.selectScenario$.subscribe((res) => {
                if (res && this.selectUnitType) {
                    this.getTables(this.selectUnitType, res.scenarioId);
                }
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
    private async getTables(table: number, id: number): Promise<void> {
        this.apsService.tableStruct = table;
        this.apsService.scenarioId = id;
        const data = await this.apsService.getReferenceBook(table, id);
        this.apsService.showTable$.next(data);
    }

    onClickTr(event: MouseEvent, element?: any): void {
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
            this.selectUnitType = element.unitType;
            this.selectedRowProduct = element.id;
            this.getTables(
                element.unitType,
                this.apsService.selectScenario$?.getValue().scenarioId
            );
        } else {
            this.selectedRowProduct = null;
            this.selectUnitType = null;
        }
    }
}
