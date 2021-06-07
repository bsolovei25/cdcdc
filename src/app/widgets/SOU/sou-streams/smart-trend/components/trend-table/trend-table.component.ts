import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TABLE_ROW_DATA } from "@widgets/SOU/sou-streams/smart-trend/components/trend-table/mock";

@Component({
  selector: 'evj-trend-table',
  templateUrl: './trend-table.component.html',
  styleUrls: ['./trend-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendTableComponent implements OnInit {

    public tableRow: {} = TABLE_ROW_DATA;
    public tableContent: [] = [];

  constructor() { }

  ngOnInit(): void {
      this.tableRow = TABLE_ROW_DATA;
      for (let i = 0; i < 10; i++) {
          // @ts-ignore
          this.tableContent.push(this.tableRow);
      }
  }

}
