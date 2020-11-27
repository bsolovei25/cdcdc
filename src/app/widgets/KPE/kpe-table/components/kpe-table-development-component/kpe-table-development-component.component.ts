import { Component, OnInit } from '@angular/core';
import { IKpeTable, IKpeTableHeader } from '../../kpe-table.component';
import { table, tableHeader } from '../kpe-table-mock';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'evj-kpe-table-development-component',
  templateUrl: './kpe-table-development-component.component.html',
  styleUrls: ['./kpe-table-development-component.component.scss']
})
export class KpeTableDevelopmentComponentComponent implements OnInit {
    data: IKpeTable[] = table;
    columnsToDisplay: IKpeTableHeader[] = tableHeader;

    expandedElement: SelectionModel<string> = new SelectionModel(true);
    selectedRowProduct: string;
    selectedRow: SelectionModel<string> = new SelectionModel(true);
  constructor() { }

  ngOnInit(): void {
  }

    notCriticalCount(element: IKpeTable): number {
        let i = 0;
        element.parameters.forEach((value) => (value.isNotCritical > 0 ? (i += 1) : (i += 0)));
        return i;
    }
    criticalCount(element: IKpeTable): number {
        let i = 0;
        element.parameters.forEach((value) => (value.isCritical > 0 ? (i += 1) : (i += 0)));
        return i;
    }
    deviationCount(element: IKpeTable): number {
        let i = 0;
        element.parameters.forEach((value) => (value.isDeviation > 0 ? (i += 1) : (i += 0)));
        return i;
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
}
