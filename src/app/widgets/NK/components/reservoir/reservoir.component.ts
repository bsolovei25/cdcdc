import { IVolume } from './../../interfaces/interfaces';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.scss']
})
export class ReservoirComponent implements OnInit, OnChanges {
  @Input() volume: IVolume;
  @Input() isFilling: boolean;

  reservoirCustomization: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }
}
