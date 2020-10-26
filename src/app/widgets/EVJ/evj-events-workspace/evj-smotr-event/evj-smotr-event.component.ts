import {Component, Input, OnInit} from '@angular/core';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { EventService } from '../../../../dashboard/services/widgets/EVJ/event.service';

@Component({
    selector: 'evj-smotr-event',
    templateUrl: './evj-smotr-event.component.html',
    styleUrls: ['./evj-smotr-event.component.scss'],
})
export class EvjSmotrEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    public isEscalatePopupOpen: boolean = false;
    public isClosePopupOpen: boolean = false;
    public isReasonsPopupOpen: boolean = false;

    public graph: any;

    constructor(public ewService: EventsWorkspaceService, private eventService: EventService) {}

    public ngOnInit(): void {}

    public isDisabledCloseButton(): boolean {
        return this.ewService.event.status.name === 'closed';
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(
        message: IChatMessageWithAttachments,
        msgType: 'comments' | 'facts'
    ): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onEscalateEvent(message: IChatMessageWithAttachments): void {
        this.isEscalatePopupOpen = false;
        console.log(message);
        if (message) {
            this.ewService.escalateEvent(message);
        }
    }

    public onCloseCard(message: IChatMessageWithAttachments): void {
        this.isClosePopupOpen = false;
        console.log(message);
        if (message) {
            this.ewService.closeEvent(message);
        }
    }

    setReason(reason: { id: string; name: string }): void {
        this.isReasonsPopupOpen = false;
        if (reason === null) {
            return;
        }
        this.ewService.event.directReasons = reason.name;
    }
    public openClosePopup(): void {
        if (this.isDisabledCloseButton()) {
            return;
        }
        this.isClosePopupOpen = true;
    }

    public onClickUrl(): void {
        if (!this.isDisabledUrlButton()) {
            window.open(this.ewService.event.deviationData.urlOriginalSystem);
        }
    }

    public isDisabledUrlButton(): boolean {
        return !this.ewService.event.deviationData?.urlOriginalSystem;
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }
}
