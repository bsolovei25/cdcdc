import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { ISouBalance } from 'src/app/dashboard/models/SOU/sou-balance.model';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

@Component({
  selector: 'evj-sou-balance',
  templateUrl: './sou-balance.component.html',
  styleUrls: ['./sou-balance.component.scss']
})
export class SouBalanceComponent extends WidgetPlatform implements OnInit {
  menuData: string[] = ['Измеренное', 'Согласованное'];
  data: ISouBalance[] = [
    {
      title: 'Итого сырья',
      icon: 'material',
      mass: 1634153,
      percent: 100,
      products: [
        {
          type: 'oil',
          title: 'Нефть',
          percent: 87.28,
          mass: 1433569
        },
        {
          type: 'oil_kgs',
          title: 'КГС',
          percent: 8.29,
          mass: 136212
        },
        {
          type: 'barrel_small',
          title: 'Прочие',
          percent: 4.42,
          mass: 72565
        }
      ]
    }, 
    {
      title: "Итого продукции",
      icon: 'production',
      mass: 1634153,
      percent: 99.49182371287,
      products: [
        {
          type: 'summ',
          title: 'Всего светлых',
          percent: 71.02,
          mass: 1114929
        },
        {
          type: 'car',
          title: 'Бензины',
          percent: 33.16,
          mass: 518130
        },
        {
          type: 'plane',
          title: 'ТС-1',
          percent: 71.02,
          mass: 1114929
        },
        {
          type: 'truck',
          title: 'ДТ',
          percent: 30.31,
          mass: 457760
        },
        {
          type: 'ship',
          title: 'СМТ',
          percent: 1.82,
          mass: 28514
        },
        {
          type: 'ring',
          title: 'Ароматика',
          percent: 0.77,
          mass: 12126
        },
        {
          type: 'summ',
          title: 'Всего темных',
          percent: 15.62,
          mass: 245190
        },
        {
          type: 'oil',
          title: 'Газы',
          percent: 1.69,
          mass: 26550
        },
        {
          type: 'oil',
          title: 'Топливо',
          percent: 8.61,
          mass: 218970
        },
        {
          type: 'oil',
          title: 'Потери',
          percent: 8.61,
          mass: 218970
        },
        {
          type: 'oil',
          title: 'Прочее',
          percent: 8.61,
          mass: 218970
        }
      ]
    }
  ]

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
