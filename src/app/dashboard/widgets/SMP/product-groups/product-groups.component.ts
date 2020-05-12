import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef} from '@angular/core';
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
  TypeImage: string;
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
  datas: IProducts[] = [
    
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

  map(data: IProducts[]): void {
    for (const item of data) {
      item.products.sort((prev, next) => {
        return next.priority > prev.priority ? -1 : prev.priority > next.priority ? 1 : 0;
      });
      switch (item.groupName.toLowerCase()) {
        case 'бензины':
          item.TypeImage = 'benzin';
          this.datas.push(item);
          break;
        case 'дт':
          item.TypeImage = 'benzin';
          this.datas.push(item);
          break;
        case 'тс':
          item.TypeImage = 'plane';
          this.datas.push(item);
          break;
        case 'судовое/мазут':
          item.TypeImage = 'ship';
          this.datas.push(item);
          break;
        case 'битумы':
          item.TypeImage = 'car';
          this.datas.push(item);
          break;
        case 'суг':
          item.TypeImage = 'fire';
          this.datas.push(item);
          break;
        case 'ароматика':
          item.TypeImage = 'cube';
          this.datas.push(item);
          break;
        default:
          item.TypeImage = 'water';
          this.datas.push(item);
      }
    }

   // const curState = this.dataService.states$.getValue();
    // const activeElement = data.find(
    //   (el) => el.groupName.toLowerCase() === curState.productGroup.toLowerCase()
    // );
    // if (activeElement) {
    //   activeElement.isActive = true;
    // }

    data.forEach((el) => {
      el.groupValue = Math.round(el.groupValue);
      el.groupDeviationValue = Math.round(el.groupDeviationValue);
      el.products.forEach((item) => {
        item.productValue = Math.round(item.productValue);
        item.productDeviation = Math.round(item.productDeviation);
      });
    });

    this.datas = data;
  }
}
