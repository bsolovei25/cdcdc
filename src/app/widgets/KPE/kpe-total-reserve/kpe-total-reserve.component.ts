import { Component, Inject, OnInit } from '@angular/core';
import { title } from 'process';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

interface ITotalReserve {
  title?: string;
  value: number;
  product: ITotalReserveProductsList[];
}
interface ITotalReserveProductsList {
  productTitle: string;
  value: number;
  items: ITotalReserveProduct[];
}
interface ITotalReserveProduct {
  name: string;
  value: number;
}

@Component({
  selector: 'evj-kpe-total-reserve',
  templateUrl: './kpe-total-reserve.component.html',
  styleUrls: ['./kpe-total-reserve.component.scss']
})


export class KpeTotalReserveComponent extends WidgetPlatform<unknown> implements OnInit {
  data: ITotalReserve[] = [];
  choosenItem: number = 0;
  constructor(
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  public ngOnInit(): void {
    super.widgetInit();
  }

  public changeSettinge(i: number) {
    this.choosenItem = i;
  }

  protected dataHandler(ref: any): void {
    this.data = ref.productGroup;
    this.data[0].title = 'Общий запас по качеству от PIMS'
    this.data[1].title = 'Общий запас по качеству ГОСТ'
  }

}
