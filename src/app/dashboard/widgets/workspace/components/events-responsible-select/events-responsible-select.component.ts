import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';
import { IUser } from '../../../../models/events-widget';

@Component({
    selector: 'evj-events-responsible-select',
    templateUrl: './events-responsible-select.component.html',
    styleUrls: ['./events-responsible-select.component.scss'],
})
export class EventsResponsibleSelectComponent implements OnInit {
    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

    public chooseRespons(data: IUser): void {
      this.ewService.event.fixedBy = data;
  }
}
