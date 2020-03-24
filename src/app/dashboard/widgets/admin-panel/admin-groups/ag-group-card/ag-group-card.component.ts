import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-ag-group-card',
  templateUrl: './ag-group-card.component.html',
  styleUrls: ['./ag-group-card.component.scss']
})
export class AgGroupCardComponent implements OnInit {
  @Input() public group = null;
  @Input() public isCardActive: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  }


}
