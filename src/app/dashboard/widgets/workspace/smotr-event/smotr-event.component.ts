import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-smotr-event',
    templateUrl: './smotr-event.component.html',
    styleUrls: ['./smotr-event.component.scss'],
})
export class SmotrEventComponent implements OnInit {
    public reasons: string[] = [
        'Причина 1',
        'Причина 2',
        'Причина 3',
        'Причина 4',
        'Причина 5',
        'Причина 6',
    ];

    public isEscalatePopupOpen: boolean = false;
    public isClosePopupOpen: boolean = false;
    public isReasonsPopupOpen: boolean = false;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(message: string, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType, false);
    }
}
