import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { P } from '@angular/cdk/keycodes';


export interface IAPSGanttChart {
  id?: number;
  productName: string;
  productDeviation: number;
  productProduction: number; // приготовление
  productPassport: number;
  productShip: number;
  deviationInventory: number; // 1 - желтый
  deviationQuality: number; // 1 - желтый 2 - красный
  tank: IAPSGanttTank[];
  operationsRenderValues?: Map<IColumnsToDisplay, IUIELement[]>;
}

// export interface IAPSGanttTank {
//   productName?: string;
//   tankName: string;
//   tankProduction: number;
//   tankPassport: number;
//   tankShip: number;
//   tankDeviation: number;
//   deviationInventory: number;
//   deviationQuality: number;
//   operations: IGanttTankOperations[];
//   operationsRenderValues?: Map<IColumnsToDisplay, IUIELement[]>;
// }

export interface IUIELements {
  id: number;
  type: TypeOperation;
  style: { width: number; left: number };
  previousElement?: string;
  nextElement?: string;
  firstElement?: boolean;
  lastElement?: boolean;
}

export interface IColumnsToDisplay {
  date: Date;
  name: string;
}

export interface IUIELement {
  id: string;
  value: IUIELements[];
}

interface IGanttTankOperations {
  id: number;
  operationType: TypeOperation;
  startOperationDate: Date;
  endOperationDate: Date;
}

type TypeOperation = 'timeLowerOrIncrease'
  | 'fixedSelection' | 'minOrMaxLoad' | 'fixedLoad' | 'engagementRate' | 'fixedQualityScore';

export interface IAPSGanttTank {
  id: number;
  productName: string;
  productValue: number;
  productDeviation: number;
  deviationQuality: number;
  operation: IGanttTankOperations[];
  operationRender: IUIELements[];
  tank: IAPSGanttTank[];
}

@Component({
  selector: 'evj-aps-gantt-chart',
  templateUrl: './aps-gantt-chart.component.html',
  styleUrls: ['./aps-gantt-chart.component.scss']
})
export class ApsGanttChartComponent extends WidgetPlatform implements OnInit, OnDestroy {

  dataSource: IAPSGanttTank[] = [{
    id: 1,
    productName: 'ДТЛ Евро С д.т.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
    tank: [{
      id: 2,
      productName: '1 fdfsdfdsf',
      productDeviation: 282.773,
      productValue: 38457.545,
      deviationQuality: 1,
      tank: [],
      operation: [],
      operationRender: [{
        id: 5,
        type: 'timeLowerOrIncrease',
        style: { width: 30, left: 10 },
      }]
    },
    {
      id: 4,
      productName: '1 fdfsdfdsf',
      productDeviation: 282.773,
      productValue: 38457.545,
      deviationQuality: 1,
      tank: [],
      operation: [],
      operationRender: [{
        id: 5,
        type: 'timeLowerOrIncrease',
        style: { width: 30, left: 10 },
      }]
    }],
    operation: [],
    operationRender: [{
      id: 3,
      type: 'timeLowerOrIncrease',
      style: { width: 30, left: 10 },
    }]
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
    tank: [{
      id: 2,
      productName: '14324',
      productDeviation: 282.773,
      productValue: 38457.545,
      deviationQuality: 1,
      tank: [],
      operation: [],
      operationRender: [{
        id: 5,
        type: 'timeLowerOrIncrease',
        style: { width: 30, left: 10 },
      }]
    },
    {
      id: 8,
      productName: '1 fdf31232sdfdsf',
      productDeviation: 282.773,
      productValue: 38457.545,
      deviationQuality: 1,
      tank: [],
      operation: [],
      operationRender: [{
        id: 5,
        type: 'timeLowerOrIncrease',
        style: { width: 30, left: 10 },
      }]
    }],
    operation: [],
    operationRender: [{
      id: 3,
      type: 'timeLowerOrIncrease',
      style: { width: 30, left: 10 },
    }]
  },
  {
    id: 1,
    productName: 'last-row',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
    tank: [],
    operation: [],
    operationRender: []
  }];

  columnsToDisplay: IColumnsToDisplay[] = [
    { name: 'productName', date: new Date() },
    { name: '1.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '3.02', date: new Date() }];


  expandedElement: SelectionModel<number> = new SelectionModel(true);
  selectedRow: SelectionModel<string> = new SelectionModel(true);
  selectedRowProduct: number;
  selectedColumn: SelectionModel<number> = new SelectionModel(true);

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
    // this.data = ref.chartItems;
  }

  onClickTr(
    event: MouseEvent,
    element?: IAPSGanttChart,
    line?: string,
    div?: IUIELements
  ): void {
    event.stopPropagation();
    if (this.expandedElement.isSelected(element.id)) {
      this.expandedElement.deselect(element.id);
    } else {
      this.expandedElement.select(element.id);
    }
  }

  onClickRow(event: MouseEvent, element?: IAPSGanttChart): void {
    event.stopPropagation();
    if (!this.selectedRowProduct) {
      this.selectedRowProduct = element.id;
    } else {
      if (element.id !== this.selectedRowProduct) {
        this.selectedRowProduct = element.id;
      } else {
        this.selectedRowProduct = null;
      }
    }
  }


}
