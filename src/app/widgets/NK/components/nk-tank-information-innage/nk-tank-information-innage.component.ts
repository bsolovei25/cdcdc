import { IInnage } from './../../../../dashboard/models/NK/nk-tank-information.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-innage',
  templateUrl: './nk-tank-information-innage.component.html',
  styleUrls: ['./nk-tank-information-innage.component.scss']
})
export class NkTankInformationInnageComponent implements OnInit, OnChanges {
  @Input() innageMin: number;
  @Input() innageCurrent: number;
  @Input() innageMax: number;

  higher: number;
  current: number;
  lower: number;


  innageDiagramCustomization: number[] =
    [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  diagramCustomLinesCount: number;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.higher = this.innageMax > 0 ? this.innageMax : 1000; // Если максимальный взлив 0
    this.current = this.innageCurrent;
    this.lower = this.innageMin;

    this.diagramCustomLinesCount =
      Math.ceil(this.current / this.higher * (this.innageDiagramCustomization.length - 1));
  }
}
