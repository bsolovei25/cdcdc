import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../../../models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'evj-ag-group-worker-card',
  templateUrl: './ag-group-worker-card.component.html',
  styleUrls: ['./ag-group-worker-card.component.scss']
})
export class AgGroupWorkerCardComponent implements OnInit {
  @Input() public worker: IUser = null;
  @Input() public isInBrigade: boolean = true;

  // TODO
  @Output() private changeGroup: EventEmitter<void> = new EventEmitter<void>();

  public cardSelection: SelectionModel<void> = new SelectionModel<void>();

  constructor() { }

  public ngOnInit(): void {
  }

  public onClick(): void {
    if (this.isInBrigade){
      this.cardSelection.toggle();
    }
  }

}
