import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IDatesInterval, WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { IOilOperations } from '../../models/oil-operations';
import { OilOperationsService } from '../../services/widgets/oil-operations.service';

export interface IOilOperationsButton {
    isFilter: boolean;
    filter: boolean;
    line: boolean;
    adjust: boolean;
    free: boolean;
}

@Component({
  selector: 'evj-oil-operations',
  templateUrl: './oil-operations.component.html',
  styleUrls: ['./oil-operations.component.scss']
})
export class OilOperationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 64;
    public static itemRows: number = 16;
    public static minItemCols: number = 54;
    public static minItemRows: number = 16;

    public isOpenReceived: boolean = false;
    public isOpenShipment: boolean = false;

    private currentDates: IDatesInterval;

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
      },
      {
        id: 3,
        name: 'Список паспортов LIMS',
        type: 'reference',
      },
      {
        id: 4,
        name: 'Публикации в БЛПС',
        type: 'reference',
      }
    ],
    shipment: [
      {
        id: 1,
        name: 'Свободные отгрузки',
        value: 2352,
        type: 'free',
      },
      {
        id: 2,
        name: 'Привязать отгрузки автоматически',
        type: 'filter',
      },
      {
        id: 3,
        name: 'Создать корректировку',
        type: 'adjust',
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
      },
      {
        id: 2,
        name: 'Мазут'
      },
      {
        id: 3,
        name: 'Мазут'
      },
      {
        id: 4,
        name: 'Мазут'
      },
      {
        id: 5,
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

    filter: IOilOperationsButton = {
        isFilter: false,
        filter: false,
        line: false,
        adjust: false,
        free: false,
    };

    constructor(
        protected widgetService: WidgetService,
        private oilOperationService: OilOperationsService,
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
        // this.data = ref;
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => {
                    this.onDatesChange(ref);
                }
            ),
        );
    }

    // TODO вынести проверку на null в сервис
    private onDatesChange(dates: IDatesInterval): void {
        if (!dates) {
            dates = {
                fromDateTime: new Date(),
                toDateTime: new Date()
            };
            dates.toDateTime.setHours(23, 59, 59);
            dates.fromDateTime.setHours(0, 0, 0);
        }
        this.currentDates = dates;
        console.log(this.currentDates);
        // this.oilOperationService.getTransferList(this.currentDates);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    openFilter(open: boolean): void {
        this.active('isFilter');
    }

    openShipment(name: string): void {
        this.isOpenShipment = false;
        this.isOpenReceived = true;
        this.active(name);
    }

    openReceived(name: string): void {
        this.isOpenReceived = false;
        this.isOpenShipment = true;
        this.active(name);
    }

    closeShipment(event: boolean): void {
        this.disabled();
        this.isOpenShipment = true;
    }

    closeReceived(event: boolean): void {
        this.disabled();
        this.isOpenReceived = true;
    }

    active(itemActive: string): void {
        Object.keys(this.filter).forEach(key => {
              if (key === itemActive) {
                  this.filter[key] = true;
              } else {
                  this.filter[key] = false;
              }
        });
    }

    disabled(): void {
        Object.keys(this.filter).forEach(item => {
            this.filter[item] = false;
        });
    }
}
