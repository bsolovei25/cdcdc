import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-column-grid',
  templateUrl: './column-grid.component.html',
  styleUrls: ['./column-grid.component.scss']
})
export class ColumnGridComponent implements OnInit {
  @Input() key: string;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
