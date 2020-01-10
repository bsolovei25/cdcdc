import { Component, OnInit, Output, Input, EventEmitter, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'evj-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Output() changePage: EventEmitter<number> = new EventEmitter();

  @Input() perPage: number;
  @Input() currentPage: number;
  @Input() totalCount: number;
  @Input() pers: number[] = [20, 18, 30];
  @Input() aroundCount = 2;
  @Input() showPersSelect = false;

  public countPages: number;
  public maxButons: number;
  public middleValue: number;
  public pages: number[] = [];
  public onSelectPage: (page: number) => void;

  public get leftDots(): number[] {
    const leftPages = this.leftPages;

    if (this.currentPage < this.countPages - this.middleValue + 1) {
      const first = leftPages[leftPages.length - 1];
      const last = this.middlePages[0];
      return Array(last - first - 1).fill(0).map((x, i) => first + i + 1);
    } else {
      const first = leftPages[leftPages.length - 1];
      const last = this.rightPages[0];
      return Array(last - first - 1).fill(0).map((x, i) => first + i + 1);
    }
  }

  public get rightDots(): number[] {
    const middlePages = this.middlePages;
    const leftPages = this.leftPages;

    if (this.currentPage > this.middleValue) {
      const first = middlePages[middlePages.length - 1];
      const last = this.rightPages[0];
      return Array(last - first - 1).fill(0).map((x, i) => first + i + 1);
    } else {
      const first = leftPages[leftPages.length - 1];
      const last = this.rightPages[0];
      return Array(last - first - 1).fill(0).map((x, i) => first + i + 1);
    }
  }

  public get leftPages(): number[] {
    if (this.currentPage > this.middleValue) {
      return Array(this.aroundCount)
        .fill(0)
        .map((x, i) => i + 1);
    } else {
      return Array(this.maxButons - this.aroundCount + 1)
        .fill(0)
        .map((x, i) => i + 1);
    }
  }

  public get middlePages(): number[] {
    if (
      this.currentPage > Math.ceil(this.maxButons / 2) &&
      this.currentPage < this.countPages - this.middleValue + 1
    ) {
      return Array(this.aroundCount * 2 + 1)
        .fill(this.currentPage - this.aroundCount)
        .map((x, i) => x + i);
    } else {
      return [];
    }
  }

  public get rightPages(): number[] {
    if (this.currentPage > this.countPages - this.middleValue) {
      return Array(this.maxButons - this.aroundCount + 1)
        .fill(this.countPages)
        .map((x, i) => x - i)
        .reverse();
    } else {
      return Array(this.aroundCount)
        .fill(this.countPages)
        .map((x, i) => x - i)
        .reverse();
    }
  }

  constructor(
    private changeDetection: ChangeDetectorRef
  ) {
    this.onSelectPage = this.selectPage.bind(this);
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if ('totalCount' in changes) {
      this._initVariables();
    }
  }

  public onChangePer(per: string): void {
    this.perPage = +per;
    this.changeDetection.markForCheck();
    this._initVariables();
  }

  public onClick(page: number): void {
    this.currentPage = page;
    this.changePage.emit(page);
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    this.changeDetection.markForCheck();
    this.changePage.emit(page);
  }

  private _initVariables(): void {
    if (!this.totalCount) {
      return;
    }

    if (!this.perPage) {
      this.perPage = this.pers[0];
    }

    this.countPages = Math.ceil(this.totalCount / this.perPage);
    this.pages = Array(this.countPages).fill(0).map((x, i) => i + 1);
    this.maxButons = this.aroundCount * 4 + 1;
    this.middleValue = Math.ceil(this.maxButons / 2);

    if (this.currentPage > this.countPages) {
      this.currentPage = this.countPages;
    }
  }
}
