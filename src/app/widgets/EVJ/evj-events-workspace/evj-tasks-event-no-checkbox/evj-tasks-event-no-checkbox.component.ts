import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { EventsWorkspaceService } from "@dashboard/services/widgets/EVJ/events-workspace.service";
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';

@Component({
    selector: 'evj-evj-tasks-event-no-checkbox',
    templateUrl: './evj-tasks-event-no-checkbox.component.html',
    styleUrls: ['./evj-tasks-event-no-checkbox.component.scss']
})
export class EvjTasksEventNoCheckboxComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.ewService.event.status = this.ewService.event.status
            ? this.ewService.event.status
            : this.ewService.status.find((value) => value.name === 'new');
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public compareFn(a: {id : any}, b: {id : any}): boolean {
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
