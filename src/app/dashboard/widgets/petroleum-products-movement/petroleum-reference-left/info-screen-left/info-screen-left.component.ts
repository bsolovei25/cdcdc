import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-info-screen-left',
  templateUrl: './info-screen-left.component.html',
  styleUrls: ['./info-screen-left.component.scss']
})
export class InfoScreenLeftComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
