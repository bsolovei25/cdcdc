import { Component, OnInit, Input } from '@angular/core';
import { IGroup } from '../../../../models/admin-panel';

@Component({
  selector: 'evj-ag-group-card',
  templateUrl: './ag-group-card.component.html',
  styleUrls: ['./ag-group-card.component.scss']
})
export class AgGroupCardComponent implements OnInit {
  @Input() public group: IGroup = null;
  @Input() public isCardActive: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  }


}
