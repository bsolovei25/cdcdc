import { Component, Input, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { IExtraOptionsWindow } from '../../../../dashboard/models/EVJ/events-widget';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-tasks-event',
    templateUrl: './evj-tasks-event.component.html',
    styleUrls: ['./evj-tasks-event.component.scss'],
})
export class EvjTasksEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;
    kpeAdditionalParameter: FormControl = new FormControl(
        !!this.ewService.event.kpeAdditionalParameter
    );

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.ewService.event.status = this.ewService.status.find((value) => value.name === 'new');
        this.ewService.extraOptionsWindow$.subscribe((value) => {
            console.log(value, this.ewService.event.kpeAdditionalParameter);
            if (
                value?.type === 'save' ||
                (value?.type === 'cancel' && this.ewService.event.kpeAdditionalParameter)
            ) {
                this.kpeAdditionalParameter.setValue(true);
            }
            if (value?.type === 'reset' || (value?.type === 'cancel' && !this.ewService.event.kpeAdditionalParameter)) {
                this.kpeAdditionalParameter.setValue(false);
            }
        });
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
        console.log(this.ewService.event.kpeAdditionalParameter);
        const popupWindow: IExtraOptionsWindow = {
            data: this.ewService.event?.kpeAdditionalParameter,
            isShow: true,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }
}
