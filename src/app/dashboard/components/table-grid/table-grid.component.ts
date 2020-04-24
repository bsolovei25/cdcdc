import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
  @Input() data: any;
  @Input() columns: any;

  constructor() { }

  ngOnInit(): void {
  }

}
