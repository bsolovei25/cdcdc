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
          operation: "Налив"
        },
        {
          id: 5,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "Налив"
        },
        {
          id: 6,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "Налив"
        },
        {
          id: 7,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "Налив"
        }
      ],
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
          operation: "Налив"
        },
        {
          id: 5,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "Налив"
        }
      ],
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
          operation: "Налив"
        },
        {
          id: 5,
          name: "Резервуар №1.2",
          valuePas: 617,
          valueGr: 21,
          valueLev: 505.2,
          tankFilling: 32,
          status: "down",
          operation: "Налив"
        }
      ],
    },
  ];

  public isFilterTable: boolean = false;

  constructor(
    public widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.isRealtimeData = false;
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

  openFilterTable(event: boolean): void {
    this.isFilterTable = event;
  }

  closeFilter(event: boolean): void {
    this.isFilterTable = event;
  }

}
