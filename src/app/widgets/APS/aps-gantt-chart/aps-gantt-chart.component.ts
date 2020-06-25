import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';


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

export interface IAPSGanttTank {
  productName?: string;
  tankName: string;
  tankProduction: number;
  tankPassport: number;
  tankShip: number;
  tankDeviation: number;
  deviationInventory: number;
  deviationQuality: number;
  operations: IGanttTankOperations[];
  operationsRenderValues?: Map<IColumnsToDisplay, IUIELement[]>;
}

interface IGanttTankOperations {
  id: number;
  operationType: TypeOperation;
  startOperationDate: Date;
  endOperationDate: Date;
}

type TypeOperation = 'TimeLowerOrIncrease'
  | 'FixedSelection' | 'MinOrMaxLoad' | 'FixedLoad' | 'EngagementRate' | 'Fixed Quality Score';

export interface IUIELement {
  id: string;
  value: IUIELements[];
}

export interface IUIELements {
  id: number;
  type: string;
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

export interface INewInt {
  id: number;
  productName: string;
  productValue: number;
  productDeviation: number;
  deviationQuality: number; // 1 - желтый 2 - красный
  operation: IGanttTankOperations[];
  tank: INewInt[];
}

@Component({
  selector: 'evj-aps-gantt-chart',
  templateUrl: './aps-gantt-chart.component.html',
  styleUrls: ['./aps-gantt-chart.component.scss']
})
export class ApsGanttChartComponent extends WidgetPlatform implements OnInit, OnDestroy {

  dataSource: IAPSGanttChart[] = [{
    productName: 'ДТЛ Евро С д.т.',
    productDeviation: 282.773,
    productProduction: 38457.545,
    productPassport: 38457.55,
    productShip: 47082.618,
    deviationInventory: 0,
    deviationQuality: 1,
    id: 1,
    operationsRenderValues: new Map(),
    tank: []
  }];
  columnsToDisplay: IColumnsToDisplay[] = [
    { name: 'productName', date: new Date() },
    { name: '1.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '3.02', date: new Date() }];


  expandedElement: SelectionModel<IAPSGanttChart> = new SelectionModel(true);
  selectedRow: SelectionModel<string> = new SelectionModel(true);
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
  }


}
