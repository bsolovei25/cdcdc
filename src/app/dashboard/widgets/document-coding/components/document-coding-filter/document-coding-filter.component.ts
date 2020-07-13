import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

export interface IDocumentCodingFilterSection {
  id: number;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'evj-document-coding-filter',
  templateUrl: './document-coding-filter.component.html',
  styleUrls: ['./document-coding-filter.component.scss']
})
export class DocumentCodingFilterComponent implements OnInit, OnChanges {
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public title: string;

  public dataParam: IDocumentCodingFilterSection[] = [
    {
      id: 1,
      name: 'Товарные НП',
      isActive: true,
    },
    {
      id: 2,
      name: 'Исследования нефти',
      isActive: false,
    },
    {
      id: 3,
      name: 'Топливо и битум',
      isActive: false,
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

  }

  save(): void {
    this.close.emit(false);
  }

  exit(): void {
    this.close.emit(false);
  }

  changeSwap(i: IDocumentCodingFilterSection): void {
    i.isActive = !i.isActive;
  }

}
