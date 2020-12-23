import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { ISouBalance } from 'src/app/dashboard/models/SOU/sou-balance.model';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { souBalanceData } from './sou-balance.mock';

@Component({
  selector: 'evj-sou-balance',
  templateUrl: './sou-balance.component.html',
  styleUrls: ['./sou-balance.component.scss']
})
export class SouBalanceComponent extends WidgetPlatform implements OnInit {
  menuData: string[] = ['Измеренное', 'Согласованное'];
  data: ISouBalance[] = souBalanceData;

  choosenItem: number = 0;
  public changeSettinge(i: number) {
    this.choosenItem = i;
  }

  constructor(
      protected widgetService: WidgetService,
      @Inject('isMock') public isMock: boolean,
      @Inject('widgetId') public id: string,
      @Inject('uniqId') public uniqId: string
  ) {
      super(widgetService, isMock, id, uniqId);
  }

  ngOnInit(): void {
      this.widgetInit();
  }

  protected dataHandler(ref: any): void {}
}
