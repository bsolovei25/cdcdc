import { Component, Inject, OnInit } from '@angular/core';
import { title } from 'process';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

interface ITotalReserve {
  title: string;
  value: number;
  products: ITotalReserveProductsList[];
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
  data: ITotalReserve[] = [
    {
      title: 'Общий запас по качеству от PIMS',
      value: 9,
      products: [
        {
          productTitle: 'Бензин',
          value: 2.5,
          items: [
            {
              name: 'Плотность',
              value: 1.9
            },
            {
              name: 'ОЧ ИМ',
              value: 0.7
            },
            {
              name: 'ОЧ ИМ',
              value: 0.7
            },
            {
              name: 'ДНП',
              value: 6.5
            }
          ]
        },
        {
          productTitle: 'ДТ',
          value: 17,
          items: [
            {
              name: 'Плотность',
              value: 0.5
            },
            {
              name: 'Цет. число',
              value: 1.3
            },
            {
              name: 'МД серы',
              value: 29
            },
            {
              name: 'Смаз. сп-ть',
              value: 11
            },
            {
              name: 'ПТФ',
              value: 76
            }
          ]
        },
        {
          productTitle: 'Темные',
          value: 2.5,
          items: [
            {
              name: 'Вяз.кин.80',
              value: 27
            },
            {
              name: 'Вяз.кин.80',
              value: 10
            },
            {
              name: 'МД серы',
              value: 6
            }
          ]
        },
      ]
    },
    {
      title: 'Общий запас по качеству ГОСТ',
      value: 14,
      products: [
        {
          productTitle: 'Мазут',
          value: 2.5,
          items: [
            {
              name: 'Плотность',
              value: 19
            },
            {
              name: 'ОЧ ИМ',
              value: 20
            },
            {
              name: 'ОЧ ИМ',
              value: 40
            },
            {
              name: 'ДНП',
              value: 0
            }
          ]
        },
        {
          productTitle: 'ДТ',
          value: 17,
          items: [
            {
              name: 'Плотность',
              value: 0.5
            },
            {
              name: 'Цет. число',
              value: 1.3
            },
            {
              name: 'МД серы',
              value: 29
            },
            {
              name: 'Смаз. сп-ть',
              value: 11
            },
            {
              name: 'ПТФ',
              value: 76
            }
          ]
        },
        {
          productTitle: 'Темные',
          value: 2.5,
          items: [
            {
              name: 'Вяз.кин.80',
              value: 27
            },
            {
              name: 'Вяз.кин.80',
              value: 10
            },
            {
              name: 'МД серы',
              value: 6
            }
          ]
        },
      ]
    }
  ];
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

  protected dataHandler(ref: any): void {}

}
