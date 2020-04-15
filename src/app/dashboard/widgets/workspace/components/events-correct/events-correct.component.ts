import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';

@Component({
    selector: 'evj-events-correct',
    templateUrl: './events-correct.component.html',
    styleUrls: ['./events-correct.component.scss'],
})
export class EventsCorrectComponent implements OnInit {
    public isSmotr: boolean = false;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        if (this.ewService.event?.category?.code === '0') {
            this.isSmotr = true;
        }
    }

    public overlayConfirmationOpen(): void {
        this.ewService.isOverlayConfirmOpen = true;
    }

    public overlayConfirmationClose(): void {
        this.ewService.isOverlayConfirmOpen = false;
    }

    public addRetrieval(): void {
        this.ewService.createNewEvent(true);

        this.ewService.isOverlayRetrivealOpen = true;
    }
}
