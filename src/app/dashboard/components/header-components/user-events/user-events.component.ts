import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';
import { IEventsWidgetNotification } from '../../../models/events-widget';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'evj-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() data: IEventsWidgetNotification;

  constructor(
    private userSettings: UserSettingsService,
    private ewService: EventsWorkspaceService) {
  }

  public async openWorkspace(id: number): Promise<void> {
     await this.userSettings.LoadScreenByWidget('events-workspace');
     this.ewService.editEvent(+id);
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.onClose.emit(false);
  }

}
