import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-time-line-diagram',
  templateUrl: './time-line-diagram.component.html',
  styleUrls: ['./time-line-diagram.component.scss']
})
export class TimeLineDiagramComponent implements OnInit {

  aboutWidget = 'Сброс';
  units = 'час';

  isMock = false;


  constructor() { }

  ngOnInit() {
  }

}
