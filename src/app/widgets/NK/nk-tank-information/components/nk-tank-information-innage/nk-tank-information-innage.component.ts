import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-innage',
  templateUrl: './nk-tank-information-innage.component.html',
  styleUrls: ['./nk-tank-information-innage.component.scss']
})
export class NkTankInformationInnageComponent implements OnInit, OnChanges {
  @Input() set innageMin(data: number) {
    this.lower = data;
  }
  @Input() set innageCurrent(data: number) {
    this.current = data;
  }
  @Input() set innageMax(data: number) {
    this.higher = data;
  }

  higher: number = 0;
  current: number = 0;
  lower: number = 0;


  innageDiagramCustomization: number[] = new Array(30);
  diagramCustomLinesCount: number;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.diagramCustomLinesCount =
      Math.ceil(this.current / this.higher * (this.innageDiagramCustomization.length - 1));
  }
}
