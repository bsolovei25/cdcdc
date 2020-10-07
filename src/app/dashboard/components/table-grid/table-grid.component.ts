import { Component, OnInit, Input, ContentChildren, QueryList, HostListener, ViewChild, ElementRef, AfterViewInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ColumnGridComponent } from './components/column-grid/column-grid.component';
import { ITableGridFilter } from './components/table-grid-filter/table-grid-filter.component';
import { IOilFilter } from '../../models/oil-operations';

@Component({
  selector: 'evj-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit, AfterViewInit {
  @ViewChild('table') public table: ElementRef;
  @ContentChildren(ColumnGridComponent) columns: QueryList<ColumnGridComponent>;
  @Input() data: any;
  @Input() scrollLeft: boolean; // side scroll for contant
  @Input() search: boolean; // search-input in footer
  @Input() filters: ITableGridFilter<IOilFilter>[]; // filter-buttons in footer
  @Input() addButton: boolean; // add-button in footer
  @Input() itemFixed: boolean; // Do active item
  @Input() saveButton: boolean; // Save button in footer
  @Input() templateFooter: TemplateRef<any>; // Template footer
  @Input() deleteButton: boolean; // in progress...
  @Input() activeFilter: boolean;

  @Output() clickSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickFilter: EventEmitter<IOilFilter> = new EventEmitter<IOilFilter>();
  @Output() item: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>(); // in progress...

  objectKeys = Object.keys;

  public activeItemId: number;
  public dataSave: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSave = this.data;
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
        if (this.scrollLeft) {
          scroll.classList.remove('scrollLeftON');
          scroll.classList.add('scrollLeftOFF');
        } else {
          scroll.classList.remove('scrollRightON');
          scroll.classList.add('scrollRightOFF');
        }
      } else {
        if (this.scrollLeft) {
          scroll.classList.remove('scrollLeftON');
          scroll.classList.add('scrollLeftOFF');
        } else {
          scroll.classList.remove('scrollRightON');
          scroll.classList.add('scrollRightOFF');
        }
      }
    }
  }

  columnsByKey(item): string {
    return item.key;
  }

  searchRecord(event: any): void {
    if (event.key === 'Backspace') {
      this.data = this.dataSave;
    }
    const record = event.currentTarget.value.toLowerCase();
    const filterData = this.data.filter(
      (e) => {
        for (const key of this.objectKeys(e)) {
          if (e[key].toString().toLowerCase().indexOf(record.toLowerCase()) > -1) {
            return true;
          }
        }
      }
    );
    this.data = filterData;
    if (!event.currentTarget.value) {
      this.data = this.dataSave;
    }
  }

  save(event: boolean): void {
    this.clickSave.emit(event);
  }

  public filterSelect(event: any): void {
    this.clickFilter.emit(event);
  }

  activeItem(item: any): void {
    if (this.itemFixed) {
      this.activeItemId = item.id;
      this.item.emit(item);
    }
  }

}
