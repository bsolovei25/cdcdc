import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';

export interface IAPSRecipeDiagram {
  id: number;
  codePims: string;
  productName: string;
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

  dataSource: IAPSRecipeDiagram[] = [{
    id: 1,
    codePims: 'AS6DZ',
    productName: 'ДТЛ Евро С д.т.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 6,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 1,
  },
  {
    id: 7,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 8,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 68,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 688,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 6567,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 65673,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 622,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 64667,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 64357,
    codePims: 'SLO',
    productName: 'ВТ-3.',
    productDeviation: 282.773,
    deviationQuality: 0,
  },
  {
    id: 999,
    codePims: 'SLO',
    productName: 'last-row',
    productDeviation: 282.773,
    deviationQuality: 0,
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
    { name: '12.02', date: new Date() },
    { name: '23.02', date: new Date() },
    { name: '5.02', date: new Date() },
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

  onClickTr(
    event: MouseEvent,
    element: IAPSRecipeDiagram
  ): void {
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
