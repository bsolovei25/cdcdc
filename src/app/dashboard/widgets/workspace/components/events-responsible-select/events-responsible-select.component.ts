import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../../models/events-widget';
import { EventsWorkspaceService } from '../../../../services/widgets/events-workspace.service';

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
        this.responsible = this.ewService.event.fixedBy;
    }

    public chooseRespons(data: IUser): void {
        this.ewService.event.fixedBy = data;
    }
}
