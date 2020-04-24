import { Component, OnInit, Input, ContentChildren, QueryList, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ColumnGridComponent } from './components/column-grid/column-grid.component';

@Component({
  selector: 'evj-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit, AfterViewInit {
  @ViewChild('table') public table: ElementRef;
  @ContentChildren(ColumnGridComponent) columns: QueryList<ColumnGridComponent>;
  @Input() data: any;
  @Input() scrollSide: string; // side scroll for contant
  @Input() search: boolean; // search-input in footer
  @Input() filter: boolean; // filter-button in footer
  @Input() addButton: boolean; // add-button in footer
  @Input() itemFixed: boolean; // Do active item

  objectKeys = Object.keys;

  public isInput: boolean = false;
  public isFilter: boolean = false;

  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setStyleScroll();
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event): void {
    this.setStyleScroll();
  }

  setStyleScroll(): void {
    const scroll = this.table.nativeElement;
    if (scroll) {
      if (scroll.scrollHeight !== scroll.clientHeight) {
        if (this.scrollSide === 'left') {
          scroll.classList.remove('scrollLeftON');
          scroll.classList.add('scrollLeftOFF');
        } else {
          scroll.classList.remove('scrollRightON');
          scroll.classList.add('scrollRightOFF');
        }
      } else {
        if (this.scrollSide === 'left') {
          scroll.classList.remove('scrollLeftON');
          scroll.classList.add('scrollLeftOFF');
        } else {
          scroll.classList.remove('scrollRightON');
          scroll.classList.add('scrollRightOFF');
        }
      }
    }
  }

  columnsById(item): string {
    return item.id;
  }

  searchRecords(): void {

  }

  openFilter(): void {
    this.isFilter = !this.isFilter;
  }

  activeItem(id: number): void {
    this.activeItemId = id;
  }

}
