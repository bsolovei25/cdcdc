import { Component, OnInit, HostListener, Output, Input, EventEmitter } from '@angular/core';

export interface IDocumentCodingTanks {
  id: number;
  name: string;
}

@Component({
  selector: 'evj-document-coding-tanks',
  templateUrl: './document-coding-tanks.component.html',
  styleUrls: ['./document-coding-tanks.component.scss']
})
export class DocumentCodingTanksComponent implements OnInit {
  @Output() public filterTanks: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public isFilterTanks: boolean;

  public data: IDocumentCodingTanks[] = [
    {
      id: 1,
      name: 'Р-232'
    },
    {
      id: 2,
      name: 'Р-232'
    },
    {
      id: 3,
      name: 'Р-232'
    },
    {
      id: 4,
      name: 'Р-232'
    },
    {
      id: 5,
      name: 'Р-232'
    },
    {
      id: 6,
      name: 'Р-232'
    },
    {
      id: 7,
      name: 'Р-232'
    },
  ];

  public activeRecordId: number;

  constructor() { }

  ngOnInit(): void {
    this.setStyleScroll();
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event): void {
    this.setStyleScroll();
  }

  setStyleScroll(): void {
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

  activeRecord(id: number): void {
    if (id === this.activeRecordId) {
      this.activeRecordId = null;
    } else {
      this.activeRecordId = id;
    }
  }

  openFilterTanks() {
    this.isFilterTanks = true;
    this.filterTanks.emit(true);
  }

}
