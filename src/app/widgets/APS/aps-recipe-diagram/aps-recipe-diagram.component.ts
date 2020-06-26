import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IAPSGanttTank {
  id: number;
  productName: string;
  productValue: number;
  productDeviation: number;
  deviationQuality: number;
}

export interface IColumnsToDisplay {
  date: Date;
  name: string;
}

@Component({
  selector: 'evj-aps-recipe-diagram',
  templateUrl: './aps-recipe-diagram.component.html',
  styleUrls: ['./aps-recipe-diagram.component.scss']
})
export class ApsRecipeDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {

  dataSource: IAPSGanttTank[] = [{
    id: 1,
    productName: 'ДТЛ Евро С д.т.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 6,
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  },
  {
    id: 999,
    productName: 'last-row',
    productDeviation: 282.773,
    productValue: 38457.545,
    deviationQuality: 1,
  }];

  columnsToDisplay: IColumnsToDisplay[] = [
    { name: 'productName', date: new Date() },
    { name: '1.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '2.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: '3.02', date: new Date() },
    { name: 'План PIMS', date: new Date() },
    { name: 'Расчет', date: new Date() },
    { name: 'Дельта', date: new Date() }];

  selectedRowProduct: number;

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

}
