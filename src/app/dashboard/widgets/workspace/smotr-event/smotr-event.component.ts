import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';
import { EventService } from '../../../services/widgets/event.service';

@Component({
    selector: 'evj-smotr-event',
    templateUrl: './smotr-event.component.html',
    styleUrls: ['./smotr-event.component.scss'],
})
export class SmotrEventComponent implements OnInit {
    public isEscalatePopupOpen: boolean = false;
    public isClosePopupOpen: boolean = false;
    public isReasonsPopupOpen: boolean = false;

    constructor(public ewService: EventsWorkspaceService, private eventService: EventService) {}

    public ngOnInit(): void { }

    public isDisabledCloseButton(): boolean {
        return this.ewService.event.status.name === 'closed';
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(message: string, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onEscalateEvent(message: string): void {
        this.isEscalatePopupOpen = false;
        console.log(message);
        if (message) {
            this.ewService.escalateEvent(message);
        }
    }

    public onCloseCard(message: string): void {
        this.isClosePopupOpen = false;
        console.log(message);
        if (message) {
            this.ewService.closeEvent(message);
        }
    }

    setReason(reason: {id: string, name: string}): void {
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
        if (this.isDisabledUrlButton()) {
            return;
        }
        window.open('http://www.example.com/');
    }

    public isDisabledUrlButton(): boolean {
        return !(this.ewService.event.deviationData?.urlOriginalSystem === '');
    }

    public openLineChart(): void {
        console.log('line-chart');
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }
}
