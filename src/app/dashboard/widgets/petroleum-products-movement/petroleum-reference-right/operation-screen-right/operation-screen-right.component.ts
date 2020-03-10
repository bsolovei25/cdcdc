import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-operation-screen-right',
  templateUrl: './operation-screen-right.component.html',
  styleUrls: ['./operation-screen-right.component.scss']
})
export class OperationScreenRightComponent implements OnInit {
  @Input() data: any;
  clickPark: boolean = false;
  clickSettings: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
