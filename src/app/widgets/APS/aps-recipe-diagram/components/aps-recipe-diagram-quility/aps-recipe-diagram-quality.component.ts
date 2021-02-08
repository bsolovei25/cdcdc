import { Component, Input, OnInit } from '@angular/core';
import { IAPSRecipeDiagram, IAPSRecipeDiagramValue, IColumnsToDisplay } from '../../aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-aps-recipe-diagram-quality',
    templateUrl: './aps-recipe-diagram-quality.component.html',
    styleUrls: ['./aps-recipe-diagram-quality.component.scss'],
})
export class ApsRecipeDiagramQualityComponent implements OnInit {
    @Input() dataSourceQuality: IAPSRecipeDiagram[] = [];
    @Input() columnsToDisplay: IColumnsToDisplay[] = [];

    expandedElement: SelectionModel<number> = new SelectionModel(true);
    selectedRowProduct: number;
    selectedRow: SelectionModel<string> = new SelectionModel(true);

    constructor() {}

    ngOnInit(): void {}

    onClickTr(event: MouseEvent, element: IAPSRecipeDiagram): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.id)) {
            this.expandedElement.deselect(element.id);
        } else {
            this.expandedElement.select(element.id);
        }
    }

    onClickRow(event: MouseEvent, element?: any): void {
        event.stopPropagation();
        if (!this.selectedRowProduct || element.id !== this.selectedRowProduct) {
            this.selectedRowProduct = element.id;
        } else {
            this.selectedRowProduct = null;
        }
    }

    searchValue(
        element: IAPSRecipeDiagramValue[],
        column: IColumnsToDisplay
    ): { value: number; percentValue: number }[] {
        const el = element.find((value) => this.sameDay(value.date, column.date));
        return el?.value
            ? [
                  {
                      value: el?.value,
                      percentValue: el?.percent,
                  },
              ]
            : null;
    }

    sameDay(a: Date, d: Date): boolean {
        return a.getFullYear() === d.getFullYear() && a.getDate() === d.getDate() && a.getMonth() === d.getMonth();
    }
}
