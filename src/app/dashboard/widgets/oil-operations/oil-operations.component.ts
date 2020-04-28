import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { IOilOperations } from '../../models/oil-operations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'evj-oil-operations',
  templateUrl: './oil-operations.component.html',
  styleUrls: ['./oil-operations.component.scss']
})
export class OilOperationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
  static itemCols = 18;
  static itemRows = 14;

  public isFilter: boolean = false;
  public isTankFilter: boolean = false;
  public isLineChart: boolean = false;
  public isOpenReceived: boolean = false;

  public data: IOilOperations = {
    tableLeft: [
      {
        id: 1,
        number: 4643,
        rR: 442,
        product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
        pasport: 168,
        dateFrom: '25.02.2019 12:23',
        dateTo: '25.02.2019 12:23',
        mass: 4223.23,
        deviation: 3.3,
        status: 'open'
      },
      {
        id: 2,
        number: 4643,
        rR: 442,
        product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
        pasport: 168,
        dateFrom: '25.02.2019 12:23',
        dateTo: '25.02.2019 12:23',
        mass: 4223.23,
        deviation: 3.3,
        status: 'close'
      },
      {
        id: 3,
        number: 4643,
        rR: 442,
        product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
        pasport: 168,
        dateFrom: '25.02.2019 12:23',
        dateTo: '25.02.2019 12:23',
        mass: 4223.23,
        deviation: 3.3,
        status: 'close&norm'
      },
      {
        id: 4,
        number: 4643,
        rR: 442,
        product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
        pasport: 168,
        dateFrom: '25.02.2019 12:23',
        dateTo: '25.02.2019 12:23',
        mass: 4223.23,
        deviation: 3.3,
        status: 'close&critical'
      },
    ],
    received: [
      {
        id: 1,
        name: 'Открыть график',
        type: 'line',
      },
      {
        id: 2,
        name: 'Отредактировать ёмкости для отгрузки',
        type: 'filter',
      }
    ],
    shipment: [
      {
        id: 1,
        name: 'Свободные отгрузки',
        value: 2352,
      }
    ],
    tableRight: [
      {
        id: 1,
        direction: 'A-т ср.364',
        rRRiser: 3432,
        dok: 2334,
        mass: 4223.32,
        pasport: 168,
        shipment: 3212,
        note: 'Tруба',
      },
      {
        id: 2,
        direction: 'A-т ср.364',
        rRRiser: 3432,
        dok: 2334,
        mass: 4223.32,
        pasport: 168,
        shipment: 3212,
        note: '',
      },
      {
        id: 3,
        direction: 'A-т ср.364',
        rRRiser: 3432,
        dok: 2334,
        mass: 4223.32,
        pasport: 168,
        shipment: 3212,
        note: '',
      },
      {
        id: 4,
        direction: 'A-т ср.364',
        rRRiser: 3432,
        dok: 2334,
        mass: 4223.32,
        pasport: 168,
        shipment: 3212,
        note: 'Tруба',
      },
    ],
    filter: [
      {
        id: 1,
        name: 'Мазут'
      }
    ],
    filterTanks: [
      {
        id: 1,
        name: 'Керосины',
        valuesTank: [
          {
            id: 1,
            number: 1,
            work: true,
            limit: 60,
            valueCap: 521,
          },
          {
            id: 2,
            number: 1,
            work: true,
            limit: 60,
            valueCap: 521,
          },
        ]
      },
    ],
  };

  constructor(
    public widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.isRealtimeData = false;
    this.widgetIcon = 'reference';
  }

  ngOnInit(): void {
    super.widgetInit();
  }

  protected dataHandler(ref: any): void {
    //this.data = ref;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  openFilter(event): void {
    this.isFilter = event;
  }

  openItemReceived(event: string): void {
    this.isOpenReceived = false;
    if (event === 'line') {
      this.isLineChart = true;
      this.isTankFilter = false;
    } else if (event === 'filter') {
      this.isLineChart = false;
      this.isTankFilter = true;
    }
  }

  closeFilterTank(event: boolean): void {
    this.isTankFilter = event;
    this.isOpenReceived = true;
  }

  closeLineChart(event: boolean): void {
    this.isLineChart = event;
    this.isOpenReceived = true;
  }


}
