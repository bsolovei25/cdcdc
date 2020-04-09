import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';
import { IUser } from '../../../../models/events-widget';

@Component({
    selector: 'evj-retrieval-window',
    templateUrl: './retrieval-window.component.html',
    styleUrls: ['./retrieval-window.component.scss'],
})
export class RetrievalWindowComponent implements OnInit {
    @ViewChild('commentInput') commentInput: ElementRef;
    @ViewChild('factInput') factInput: ElementRef;
    @ViewChild('factScroll') factScroll: ElementRef;
    @ViewChild('commentScroll') commentScroll: ElementRef;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onEnterPush(event?: KeyboardEvent): void {
        if (event.keyCode === 13) {
            this.onSendMessage();
        }
    }

    public onSendMessage(isComment: boolean = true): void {
        if (!isComment && this.factInput.nativeElement.value) {
            this.ewService.retrievalEvent.facts = this.ewService.retrievalEvent?.facts ?? [];
            const msg = this.factInput.nativeElement.value;
            this.factInput.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'facts', true);
            setTimeout(() => {
                this.scrollFactBottom();
            }, 50);
        } else if (isComment && this.commentInput.nativeElement.value) {
            this.ewService.retrievalEvent.comments = this.ewService.retrievalEvent?.comments ?? [];
            const msg = this.commentInput.nativeElement.value;
            this.commentInput.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'comments', true);
            setTimeout(() => {
                this.scrollCommentBottom();
            }, 50);
        }
    }

    scrollCommentBottom(): void {
        this.commentScroll.nativeElement.scrollTop = this.commentScroll.nativeElement.scrollHeight;
    }
    scrollFactBottom(): void {
        this.factScroll.nativeElement.scrollTop = this.factScroll.nativeElement.scrollHeight;
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
}
