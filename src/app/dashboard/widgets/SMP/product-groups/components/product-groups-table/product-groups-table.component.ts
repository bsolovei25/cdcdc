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
  @Input() data: IProducts;

  scrollLine: boolean = false;

  botScrollWidth: number = 0;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
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
