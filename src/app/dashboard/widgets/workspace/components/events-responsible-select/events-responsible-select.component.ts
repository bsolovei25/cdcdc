import { Component, OnInit, Input } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';
import { IUser } from '../../../../models/events-widget';

@Component({
    selector: 'evj-events-responsible-select',
    templateUrl: './events-responsible-select.component.html',
    styleUrls: ['./events-responsible-select.component.scss'],
})
export class EventsResponsibleSelectComponent implements OnInit {
    @Input() private isRetrieval: boolean = false;

    public responsible: IUser = null;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        if (this.isRetrieval) {
            this.responsible = this.ewService.retrievalEvent.fixedBy;
        } else {
            this.responsible = this.ewService.event.fixedBy;
        }
    }

    public chooseRespons(data: IUser): void {
        if (this.isRetrieval) {
            this.ewService.retrievalEvent.fixedBy = data;
        } else {
            this.ewService.event.fixedBy = data;
        }
    }
}
