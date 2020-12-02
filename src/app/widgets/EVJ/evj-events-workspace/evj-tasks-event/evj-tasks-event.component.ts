import {Component, Input, OnInit} from '@angular/core';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';

@Component({
    selector: 'evj-tasks-event',
    templateUrl: './evj-tasks-event.component.html',
    styleUrls: ['./evj-tasks-event.component.scss'],
})
export class EvjTasksEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    public isChecked: boolean = false;
    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.ewService.event.status =
            this.ewService.status.find(value => value.name === 'new');
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public onSendMessage(
        message: IChatMessageWithAttachments,
        msgType: 'comments' | 'facts'
    ): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public compareFn(a, b): boolean {
        return a?.id === b?.id;
    }

    public infoFunc(infoType: 'start' | 'inWork' | 'close'): any {
        const obj = this.ewService.event?.productionTasks;
        return obj ? obj[infoType] : undefined;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    openExtraOptions(): void {
        this.isChecked = !this.isChecked;
        const popupWindow = {
            isShow: true,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
        console.log('extra options opened');
    }
}
