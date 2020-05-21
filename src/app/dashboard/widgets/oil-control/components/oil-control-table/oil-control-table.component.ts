import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, Output } from '@angular/core';
import { OilStorages } from 'src/app/dashboard/models/oil-control';

@Component({
  selector: 'evj-oil-control-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './oil-control-table.component.html',
  styleUrls: ['./oil-control-table.component.scss']
})
export class OilControlTableComponent implements OnInit, OnChanges {
  @Input() data: OilStorages;
  @Input() checkWidth: boolean;
  @Output() activeOperations: number;

  public maxPage: number;
  public currentPage: number;

  public criticalPage: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.data) {
      this.maxPage = this.data.operations.length;
      this.currentPage = 1;
    }
  }

  onNextOperation(event: number): void {
    this.currentPage = event;
  }

}
