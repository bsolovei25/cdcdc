import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-events-correct',
    templateUrl: './events-correct.component.html',
    styleUrls: ['./events-correct.component.scss'],
})
export class EventsCorrectComponent implements OnInit {
    public isSmotr: boolean = false;

    constructor(public ewService: EventsWorkspaceService) { }

    public ngOnInit(): void {
        if (this.ewService.event?.category?.code === '0') {
            this.isSmotr = true;
        }

        switch (this.ewService.event?.category?.code) {
            case '0':
            case '5':
                this.isSmotr = true;
                break;
            default:
                this.isSmotr = false;
        }
    }

    public addRetrieval(): void {
        this.ewService.createEvent(this.ewService.event.id);
    }

    public openSearchRetrieval(): void {
        const windowsParam = {
            isShow: true,
            idEvent: this.ewService.event.id,
            acceptFunction: () => this.ewService.closeSearchWindow(),
            closeFunction: () => this.ewService.closeSearchWindow(),
        };
        this.ewService.searchWindow$.next(windowsParam);
    }
}
