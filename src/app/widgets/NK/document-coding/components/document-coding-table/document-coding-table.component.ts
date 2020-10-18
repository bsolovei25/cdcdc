import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';

export interface IDocumentCodingTableRecord {
  id: number;
  sap: number;
  product: string;
  gost: string;
  codeOKPD: string;
}

@Component({
  selector: 'evj-document-coding-table',
  templateUrl: './document-coding-table.component.html',
  styleUrls: ['./document-coding-table.component.scss']
})
export class DocumentCodingTableComponent implements OnInit {
  @Output() public filterGroup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public filterProduct: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public isFilterGroup: boolean;
  @Input() public isFilterProduct: boolean;

  public data: IDocumentCodingTableRecord[] = [
    {
      id: 1,
      sap: 32425325325,
      product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
      gost: 'ГОСТ №44246-44 с изм. №1-5',
      codeOKPD: '19.3.233.232'
    },
    {
      id: 2,
      sap: 32425325325,
      product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
      gost: 'ГОСТ №44246-44 с изм. №1-5',
      codeOKPD: '19.3.233.232'
    },
    {
      id: 3,
      sap: 32425325325,
      product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
      gost: 'ГОСТ №44246-44 с изм. №1-5',
      codeOKPD: '19.3.233.232'
    },
    {
      id: 4,
      sap: 32425325325,
      product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
      gost: 'ГОСТ №44246-44 с изм. №1-5',
      codeOKPD: '19.3.233.232'
    },
    {
      id: 5,
      sap: 32425325325,
      product: 'ДТ ЕВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО сорт F, вид III(ДТ-Е-К5)',
      gost: 'ГОСТ №44246-44 с изм. №1-5',
      codeOKPD: '19.3.233.232'
    },
  ];

  constructor() { }

  public activeRecordId: number;

  ngOnInit(): void {
    this.setStyleScroll();
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event): void {
    this.setStyleScroll();
  }

  setStyleScroll(): void {
    const scroll = document.getElementById('scrollDocCodingTable');
    if (scroll) {
      if (scroll.scrollHeight !== scroll.clientHeight) {
        scroll.classList.remove('scrollON');
        scroll.classList.add('scrollOFF');
      } else {
        scroll.classList.remove('scrollOFF');
        scroll.classList.add('scrollON');
      }
    }
  }

  activeRecord(id: number): void {
    if (id === this.activeRecordId) {
      this.activeRecordId = null;
    } else {
      this.activeRecordId = id;
    }
  }

  openFilterGroup(): void {
    this.isFilterGroup = true;
    this.filterGroup.emit(true);
  }

  openFilterProduct(): void {
    this.isFilterProduct = true;
    this.filterProduct.emit(true);
  }

}
