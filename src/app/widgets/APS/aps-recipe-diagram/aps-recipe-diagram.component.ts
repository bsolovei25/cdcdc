import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { DATASOURCE } from './mock';
import { IViewWorkflowWindow } from '../components/view-workflow-window/view-workflow-window.component';

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

  dataSource: IAPSRecipeDiagram[] = DATASOURCE;

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
    if (!this.selectedRowProduct || element.id !== this.selectedRowProduct) {
      this.selectedRowProduct = element.id;
    } else {
      this.selectedRowProduct = null;
    }
  }

}
