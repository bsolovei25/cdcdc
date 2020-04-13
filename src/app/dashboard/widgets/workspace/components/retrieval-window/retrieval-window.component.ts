import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';
import { IUser } from '../../../../models/events-widget';

@Component({
    selector: 'evj-retrieval-window',
    templateUrl: './retrieval-window.component.html',
    styleUrls: ['./retrieval-window.component.scss'],
})
export class RetrievalWindowComponent implements OnInit {
    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSendMessage(message: string, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType, true);
    }

    overlayClose(): void {
        this.ewService.isOverlayRetrivealOpen = false;
        this.ewService.createNewEvent(true);
    }

    chooseMeropRespons(data: IUser): void {
        this.ewService.retrievalEvent.fixedBy = data;
    }

    async saveRetrieval(): Promise<void> {
        this.ewService.isLoading = true;
        this.ewService.saveNewRetrievalEvent();
        this.overlayClose();
        this.ewService.isLoading = false;
    }

    async editSaveRetrieval(): Promise<void> {
        this.ewService.isLoading = true;
        this.ewService.saveEditedRetrievalEvent();
        this.overlayClose();
        this.ewService.isLoading = false;
        // this.progressLine();
    }

    public onChangeEventDescription(descr: string): void {
        this.ewService.retrievalEvent.description = descr;
    }
}
