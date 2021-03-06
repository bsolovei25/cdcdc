import { Component, Input, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'evj-tasks-event',
    templateUrl: './tasks-event.component.html',
    styleUrls: ['./tasks-event.component.scss'],
})
export class TasksEventComponent {
    @Input() public noOverflow: boolean = false;
    public isClosedObserver: Observable<boolean> = this.ewService.event$
        .asObservable()
        .pipe(map((x) => x.status.name === 'closed'));

    constructor(public ewService: EventsWorkspaceService) {}

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
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
}
