import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'evj-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
