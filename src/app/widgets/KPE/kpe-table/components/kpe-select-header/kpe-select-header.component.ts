import { Component, OnInit } from '@angular/core';

export interface ISelectName {
  value: string;
}
@Component({
  selector: 'evj-kpe-select-header',
  templateUrl: './kpe-select-header.component.html',
  styleUrls: ['./kpe-select-header.component.scss']
})
export class KpeSelectHeaderComponent implements OnInit {

  public items: ISelectName[] = [
    { value: 'Ср. расход на дату тн' },
    { value: 'Мгновенный расход на дату тн' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
