import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IColumnsToDisplay } from '../aps-recipe-diagram/aps-recipe-diagram.component';
import { structureList } from './aps-structure-id-mock';
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
    animations: [
        trigger('rows', [
            transition('void => *', [
                style({ opacity: 1, transform: 'scaleY(0)' }),
                animate(
                    '200ms',
                    style({
                        opacity: 1,
                        transform: 'scaleY(1)',
                    })
                ),
            ]),
            transition('* => void', [
                style({ opacity: 1 }),
                animate('200ms', style({ opacity: 1, transform: 'scaleY(0)' })),
            ]),
        ]),
    ],
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
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

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
            this.apsService.selectTable$.next(element.unitType);
        } else {
            this.selectedRowProduct = null;
            this.selectUnitType = null;
        }
    }
}
