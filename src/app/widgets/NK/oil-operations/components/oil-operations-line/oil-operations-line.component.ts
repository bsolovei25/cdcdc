import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-oil-operations-line',
  templateUrl: './oil-operations-line.component.html',
  styleUrls: ['./oil-operations-line.component.scss']
})
export class OilOperationsLineComponent implements OnInit {
  @Output() closeLineChart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close(event: boolean): void {
    this.closeLineChart.emit(event);
  }

}
