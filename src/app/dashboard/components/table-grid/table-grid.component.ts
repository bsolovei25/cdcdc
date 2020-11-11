import {
    Component,
    OnInit,
    Input,
    ContentChildren,
    QueryList,
    HostListener,
    ViewChild,
    ElementRef,
    AfterViewInit,
    TemplateRef,
    EventEmitter,
    Output,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { ColumnGridComponent } from './components/column-grid/column-grid.component';
import { ITableGridFilter } from './components/table-grid-filter/table-grid-filter.component';
import { IOilFilter, IOilTransfer } from '../../models/oil-operations';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'evj-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('table') public table: ElementRef;
  @ContentChildren(ColumnGridComponent) columns: QueryList<ColumnGridComponent>;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @Input() data: IOilTransfer[];
  @Input() scrollLeft: boolean; // side scroll for contant
  @Input() search: boolean; // search-input in footer
  @Input() filters: ITableGridFilter<IOilFilter>[]; // filter-buttons in footer
  @Input() addButton: boolean; // add-button in footer
  @Input() itemFixed: boolean = false; // Do active item
  @Input() rowBgColorType: 'light' | 'dark' = 'light'; // Do active item
  @Input() saveButton: boolean; // Save button in footer
  @Input() templateFooter: TemplateRef<any>; // Template footer
  @Input() deleteButton: boolean; // in progress...
  @Input() activeFilter: boolean;

  @Output() clickSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickFilter: EventEmitter<IOilFilter> = new EventEmitter<IOilFilter>();
  @Output() item: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>(); // in progress...

  @Output()
  public scrollReachedItemId: EventEmitter<number> = new EventEmitter<number>();

  objectKeys = Object.keys;

  public activeItemId: number;
  public dataSave: any;

  constructor() { }

  ngOnInit(): void {

  }

  public ngOnChanges(changes: SimpleChanges): void {
      this.viewportCheck();
  }

  public ngAfterViewInit(): void {
    this.dataSave = this.data;
    this.setStyleScroll();
  }

  @HostListener('document:resize', ['$event'])
  public OnResize(): void {
    this.viewportCheck();
    this.setStyleScroll();
  }

  private viewportCheck(): void {
      if (this.data?.length > 0) {
          this.viewport?.checkViewportSize();
      }
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

    public async scrollHandler(event: { target: { offsetHeight: number, scrollTop: number, scrollHeight: number } }): Promise<void> {
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight
            && this.data.length
        ) {
            this.scrollReachedItemId.emit(this.data[this.data.length - 1].id);
        }
    }
}
