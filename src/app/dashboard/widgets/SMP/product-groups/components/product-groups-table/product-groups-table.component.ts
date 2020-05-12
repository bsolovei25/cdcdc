import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { IProducts } from '../../product-groups.component';

@Component({
  selector: 'evj-product-groups-table',
  templateUrl: './product-groups-table.component.html',
  styleUrls: ['./product-groups-table.component.scss']
})
export class ProductGroupsTableComponent implements OnInit {
  @ViewChild('lines') lines: ElementRef;

  @Input() widgetType: string;
  @Input() data: IProducts[];

  public datas: IProducts[] = [];

  scrollLine: boolean = false;

  botScrollWidth: number = 0;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.map(this.data);
  }

  ngAfterViewChecked(): void {
    try {
      this.botScrollWidth = document.getElementById('botscroll').scrollWidth;
      // this.cdRef.detectChanges();
      if (!this.cdRef['destroyed']) {
        this.cdRef.detectChanges();
      }
    } catch (error) { }
  }

  map(data: IProducts[]): void {
    for (const item of data) {
      // item.products.sort((prev, next) => {
      //   return next.priority > prev.priority ? -1 : prev.priority > next.priority ? 1 : 0;
      // });
      switch (item.groupName.toLowerCase()) {
        case 'бензины':
          item.typeImage = 'benzin';
          this.datas.push(item);
          break;
        case 'дт':
          item.typeImage = 'benzin';
          this.datas.push(item);
          break;
        case 'тс':
          item.typeImage = 'plane';
          this.datas.push(item);
          break;
        case 'судовое/мазут':
          item.typeImage = 'ship';
          this.datas.push(item);
          break;
        case 'битумы':
          item.typeImage = 'car';
          this.datas.push(item);
          break;
        case 'суг':
          item.typeImage = 'fire';
          this.datas.push(item);
          break;
        case 'ароматика':
          item.typeImage = 'cube';
          this.datas.push(item);
          break;
        default:
          item.typeImage = 'water';
          this.datas.push(item);
      }
    }

    // data.forEach((el) => {
    //   el.groupValue = Math.round(el.groupValue);
    //   el.groupDeviationValue = Math.round(el.groupDeviationValue);
    //   el.products.forEach((item) => {
    //     item.productValue = Math.round(item.productValue);
    //     item.productDeviation = Math.round(item.productDeviation);
    //   });
    // });

   // this.data = data;
  }

  isClickedFunc(item): void {

  }

  public isScroll(data): void {
    for (const item of data) {
      if (item.products.length > 5) {
        this.scrollLine = true;
      }
    }
  }

  onTopScroll(event): void {
    document.getElementById('botscroll').scrollLeft = event.currentTarget.scrollLeft;
  }
  onBottomScroll(event): void {
    document.getElementById('topscroll').scrollLeft = event.currentTarget.scrollLeft;
  }

}
