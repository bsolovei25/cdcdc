import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IColumnsToDisplay } from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';
import { IAstueOnpzTableIndicatorsItem } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-table-indicators.model';

@Component({
    selector: 'evj-astue-onpz-table-indicators',
    templateUrl: './astue-onpz-table-indicators.component.html',
    styleUrls: ['./astue-onpz-table-indicators.component.scss'],
})
export class AstueOnpzTableIndicatorsComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    public data: IAstueOnpzTableIndicatorsItem[] = [];
    public columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Параметры', date: null },
        { name: 'Факт', date: null },
        { name: 'Модель', date: null },
    ];

    public expandedElement: SelectionModel<string> = new SelectionModel(true);
    public selectedRow: SelectionModel<string> = new SelectionModel(true);
    public selectedRowProduct: string;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: { groups: IAstueOnpzTableIndicatorsItem[] }): void {
        this.data = ref.groups;
    }

    public onClickTr(event: MouseEvent, element: any): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    public onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.name !== this.selectedRowProduct) {
            this.selectedRowProduct = element.name;
        } else {
            this.selectedRowProduct = null;
        }
    }
}
