import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/events-workspace.service';
import { IUser, EventsWidgetNotification } from '../../../models/events-widget';

@Component({
    selector: 'evj-usual-event',
    templateUrl: './usual-event.component.html',
    styleUrls: ['./usual-event.component.scss'],
})
export class UsualEventComponent implements OnInit {
    @ViewChild('input') input: ElementRef;
    @ViewChild('input2') input2: ElementRef;
    @ViewChild('newInput') newInput: ElementRef;
    @ViewChild('newInput2') newInput2: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('scroll2') scroll2: ElementRef;
    @ViewChild('graph') graphWidht: ElementRef;
    @ViewChild('progress') progress: ElementRef;

    isEditingDescription: boolean = false;

    progressLineHeight: number;

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    onEditShortInfo(): void {
        this.isEditingDescription = true;
    }

    openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    onEnterPush(event?: any): void {
        if (event.keyCode === 13) {
            this.onSendMessage();
        }
    }

    onSendMessage(): void {
        if (this.input2.nativeElement.value) {
            const msg = this.input2.nativeElement.value;
            this.input2.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'comments', false);
            setTimeout(() => {
                this.scrollCommentBottom();
            }, 50);
        } else if (this.input.nativeElement.value) {
            const msg = this.input.nativeElement.value;
            this.input.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'facts', false);
            setTimeout(() => {
                this.scrollFactBottom();
            }, 50);
        }
    }

    scrollCommentBottom(): void {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }
    scrollFactBottom(): void {
        this.scroll2.nativeElement.scrollTop = this.scroll2.nativeElement.scrollHeight;
    }

    dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    chooseRespons(data: IUser): void {
        this.ewService.event.fixedBy = data;
    }

    onLoadEvent(id: number): void {
        this.setEventByInfo(id);
    }

    private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
        this.ewService.isLoading = true;

        this.ewService.setEventByInfo(value);

        setTimeout(() => (this.ewService.isLoading = false), 500);

        // this.progressLine();
    }

    overlayConfirmationOpen(): void {
        this.ewService.isOverlayConfirmOpen = true;
    }

    overlayConfirmationClose(): void {
        this.ewService.isOverlayConfirmOpen = false;
    }

    onEditRetrieval(retNotid: EventsWidgetNotification): void {
        this.ewService.isEditRetrievalEvent = true;
        this.ewService.retrievalEvent = retNotid;
        this.ewService.isOverlayRetrivealOpen = true;
    }

    addRetrieval(): void {
        this.ewService.createNewEvent(true);

        this.ewService.isOverlayRetrivealOpen = true;
    }

    overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }

    progressLine(): void {
        const heightMiddle = this.progress.nativeElement.offsetParent.offsetHeight - 103;
        const countRetAll = this.ewService.event.retrievalEvents.length;
        let countRetComplete = 0;
        for (let i of this.ewService.event.retrievalEvents) {
            if (i.innerNotification.status.name === 'closed') {
                countRetComplete++;
            }
        }
        this.progressLineHeight = (heightMiddle / countRetAll) * countRetComplete;
    }
}
