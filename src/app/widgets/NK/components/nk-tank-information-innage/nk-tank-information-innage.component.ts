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


  innageDiagramCustomization: number[] = new Array(20);
  diagramCustomLinesCount: number;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.higher = this.innageMax <= this.innageMin ? this.innageMin : this.innageMax;
    this.current = this.innageMin <= this.innageCurrent ? this.innageCurrent : this.innageMin;
    this.lower = this.innageMin;

    this.diagramCustomLinesCount =
      Math.ceil(this.current / this.higher * (this.innageDiagramCustomization.length - 1));
  }
}
