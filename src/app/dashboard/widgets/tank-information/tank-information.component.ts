import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { ITankInformation } from '../../models/tank-information';

@Component({
  selector: 'evj-tank-information',
  templateUrl: './tank-information.component.html',
  styleUrls: ['./tank-information.component.scss']
})
export class TankInformationComponent extends WidgetPlatform implements OnInit, OnDestroy {
  static itemCols = 18;
  static itemRows = 14;

  public data: ITankInformation[] = [
    {
      id: 1,
      name: 'БЕНЗИНЫ',
      tank: [
        {
          id: 1,
          name: "Резервуар №1.1",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "repair",
          operation: "filling"
        },
        {
          id: 2,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "shipment"
        },
        {
          id: 3,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 74,
          status: "down",
          operation: "standart"
        },
        {
          id: 4,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 100,
          status: "down",
          operation: "standart"
        },
        {
          id: 5,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "standart"
        },
        {
          id: 6,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "standart"
        },
        {
          id: 7,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "standart"
        }
      ],
      type: 'СУГ'
    },
    {
      id: 2,
      name: 'МАЗУТ',
      tank: [
        {
          id: 1,
          name: "Резервуар №1.1",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "repair",
          operation: "filling"
        },
        {
          id: 2,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "shipment"
        },
        {
          id: 3,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 74,
          status: "down",
          operation: "standart"
        },
        {
          id: 4,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 100,
          status: "down",
          operation: "shipment"
        },
        {
          id: 5,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "shipment"
        }
      ],
      type: 'ТСБ'
    },
    {
      id: 3,
      name: 'БЕНЗИНЫ',
      tank: [
        {
          id: 1,
          name: "Резервуар №1.1",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "repair",
          operation: "filling"
        },
        {
          id: 2,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "shipment"
        },
        {
          id: 3,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 74,
          status: "down",
          operation: "standart"
        },
        {
          id: 4,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 100,
          status: "down",
          operation: "shipment"
        },
        {
          id: 5,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "shipment"
        }
      ],
      type: 'БИТУМЫ'
    },
  ];

  public dataSave: ITankInformation[];
  public sendFilterData: any;

  public isFilterTable: boolean = false;

  constructor(
    public widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.widgetIcon = 'reference';
  }

  ngOnInit(): void {
    super.widgetInit();
    this.mapFilter(this.data);
  }

  protected dataHandler(ref: any): void {
    // this.dataSave = ref.items;
    //this.data = this.dataSave;
    // this.mapFilter(this.dataSave);
  }

  mapFilter(data: ITankInformation[]): void {
    const object = {
      sug: {
        open: false,
        arr: [],
      },
      tsb: {
        open: false,
        arr: [],
      },
      bitum: {
        open: false,
        arr: [],
      },
    };

    data.forEach(e => {
      if (e.type === 'СУГ') {
        const result = object.sug.arr.find(i => i?.type === e.name);
        if (!result) {
          const obj = {
            type: e.name,
            active: true,
          };
          object.sug.arr.push(obj);
        }
      } else if (e.type === 'ТСБ') {
        const result = object.tsb.arr.find(i => i?.type === e.name);
        if (!result) {
          const obj = {
            type: e.name,
            active: true,
          };
          object.tsb.arr.push(obj);
        }
      } else if (e.type === 'БИТУМЫ') {
        const result = object.bitum.arr.find(i => i?.type === e.name);
        if (!result) {
          const obj = {
            type: e.name,
            active: true,
          };
          object.bitum.arr.push(obj);
        }
      }
    });
    this.sendFilterData = object;
  }

  // filterNameData(data): any {
  //   const objectName = [];
  //   data.forEach(el => {
  //     const result = objectName.find(i => i?.type === el.name);
  //     if (!result) {
  //       const obj = {
  //         type: el.name,
  //         active: true,
  //       }
  //       objectName.push(obj);
  //     }
  //   });
  //   return objectName;
  // }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  openFilterTable(event: boolean): void {
    this.isFilterTable = event;
  }

  closeFilter(event: any): void {
    this.isFilterTable = event.close;
    this.mapData(event.data);
  }

  mapData(dataFilter) {
    this.data.filter(e => {
      if (e.type === 'СУГ') {

      }
    })
  }

}
