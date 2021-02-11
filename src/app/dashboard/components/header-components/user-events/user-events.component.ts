import { EventsWorkspaceService } from '../../../services/widgets/EVJ/events-workspace.service';
import { IEventsWidgetNotification } from '../../../models/EVJ/events-widget';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
    selector: 'evj-user-events',
    templateUrl: './user-events.component.html',
    styleUrls: ['./user-events.component.scss'],
})
export class UserEventsComponent implements OnInit {
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() data: IEventsWidgetNotification;

    constructor(private userSettings: UserSettingsService, private ewService: EventsWorkspaceService) {}

    public async eventClick(eventId: number): Promise<void> {
        let screenId;
        try {
            screenId = await this.userSettings.getScreenByWidgetType('evj-events-workspace');
        } catch (err) {
            screenId = await this.userSettings.getScreenByWidgetType('events-workspace');
        }
        if (!screenId) {
            throwError('wrong screen id');
        } else {
            await this.openWorkspace(screenId, eventId);
        }
    }

    private async openWorkspace(screenId: number, eventId: number): Promise<void> {
        await this.userSettings.loadScreen(screenId);
        this.ewService.editEvent(+eventId);
    }

    ngOnInit(): void {}

    toggleMenu(): void {
        this.onClose.emit(false);
    }
}
