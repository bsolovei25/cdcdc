import {Component, Input, OnInit} from '@angular/core';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { CmidEventToogleValue } from './components/evj-cmid-event-toggle/evj-cmid-event-toggle.component';

@Component({
    selector: 'evj-cmid-event',
    templateUrl: './evj-cmid-event.component.html',
    styleUrls: ['./evj-cmid-event.component.scss'],
})
export class EvjCmidEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    public dateNow: Date = new Date();

    public toggleValue: CmidEventToogleValue = 'non-plan';

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public countDifference(): Date {
        return new Date(new Date(this.ewService.event?.deadline).getDate() - new Date(this.ewService.event?.eventDateTime).getDate());
    }

    public setToggleValue(action: CmidEventToogleValue): void {
        this.toggleValue = action;
    }
}
