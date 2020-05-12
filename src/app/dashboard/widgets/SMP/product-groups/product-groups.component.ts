import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IProducts {
  groupName: string;
  performance: number;
  groupValue: number;
  groupDeviationValue: number;
  groupDeviationFlag: number;
  groupDeviationShip: number;
  groupDeviationShipPerformance: number;
  products: ITypeProduct[];
  typeImage?: string;
  isActive?: boolean;
}

export interface ITypeProduct {
  productName: string;
  productValue: number;
  productDeviation: number;
  peviationInventory: number;
  peviationShip: number;
  peviationQuality: number;
  performance: number;
  priority: number;
}

@Component({
  selector: 'evj-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss']
})
export class ProductGroupsComponent extends WidgetPlatform implements OnInit, OnDestroy {
  data: IProducts[] = [
    {
      groupName: 'Бензины',
      performance: 3,
      groupValue: 187863,
      groupDeviationValue: 187863,
      groupDeviationFlag: 1,
      groupDeviationShip: 0,
      groupDeviationShipPerformance: 0,
      products: [
        {
          productName: '',
          productValue: 1234,
          productDeviation: 50,
          peviationInventory: 0,
          peviationShip: 1,
          peviationQuality: 1,
          performance: 50,
          priority: 10,
        }
      ],
    },
    {
      groupName: 'Бензины',
      performance: 3,
      groupValue: 187863,
      groupDeviationValue: 187863,
      groupDeviationFlag: 1,
      groupDeviationShip: 0,
      groupDeviationShipPerformance: 0,
      products: [
        {
          productName: '',
          productValue: 1234,
          productDeviation: 50,
          peviationInventory: 0,
          peviationShip: 1,
          peviationQuality: 1,
          performance: 50,
          priority: 10,
        }
      ],
    },
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // this.dataService.data$.subscribe((data) => {
      //   if (!data?.items) {
      //     return;
      //   }
      //   console.log(data.items.productSummary);
      //   this.map(data.items.productSummary);
      //   this.isScroll(data.items.productSummary);
      // })
    );
  }

  ngAfterViewInit(): void { }

  protected dataHandler(ref: any): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cdRef.detach();
  }

}
