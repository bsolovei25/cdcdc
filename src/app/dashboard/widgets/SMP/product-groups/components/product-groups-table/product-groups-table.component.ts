import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IProducts } from '../../product-groups.component';

@Component({
  selector: 'evj-product-groups-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-groups-table.component.html',
  styleUrls: ['./product-groups-table.component.scss']
})
export class ProductGroupsTableComponent implements OnInit, OnChanges {
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
  }

  ngOnChanges(): void {
    this.datas = this.map(this.data);
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

  map(data: IProducts[]): IProducts[] {
    this.datas = [];
    for (const item of data) {
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

    return this.datas;
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

  rowsById(item: IProducts): number {
    return item.id;
  }

}
