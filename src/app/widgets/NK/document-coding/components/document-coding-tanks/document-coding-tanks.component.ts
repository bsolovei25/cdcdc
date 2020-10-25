import { Component, OnInit, HostListener, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IDocumentsTank } from '../../../../../dashboard/models/oil-document.model';

@Component({
  selector: 'evj-document-coding-tanks',
  templateUrl: './document-coding-tanks.component.html',
  styleUrls: ['./document-coding-tanks.component.scss']
})
export class DocumentCodingTanksComponent implements OnInit, OnChanges {
  @Output() public selectedTank: EventEmitter<IDocumentsTank | null> = new EventEmitter<IDocumentsTank | null>();
  @Input() public isFilterTanks: boolean;

  @Input()
  public data: IDocumentsTank[] = [];

  public filteredData: IDocumentsTank[] = [];

  public activeRecordId: string | null;

  constructor() { }

  public ngOnInit(): void {
    this.setStyleScroll();
  }

  public ngOnChanges(changes: SimpleChanges): void {
      this.filteredData = this.data;
  }

  @HostListener('document:resize', ['$event'])
  public OnResize(): void {
    this.setStyleScroll();
  }

  public setStyleScroll(): void {
    const scroll = document.getElementById('scrollDocCodingTanks');
    if (scroll) {
      if (scroll.scrollHeight !== scroll.clientHeight) {
        scroll.classList.remove('scrollOFF');
        scroll.classList.add('scrollON');
      } else {
        scroll.classList.remove('scrollON');
        scroll.classList.add('scrollOFF');
      }
    }
  }

  public onClick(tank: IDocumentsTank): void {
      this.activeRecordId = tank.id === this.activeRecordId ? null : tank.id;
      this.selectedTank.emit(this.activeRecordId ? tank : null);
  }

  public onSearchChange(event: string): void {
      this.filteredData = event ? this.data.filter(item => item.name.includes(event)) : this.data;
  }
}
