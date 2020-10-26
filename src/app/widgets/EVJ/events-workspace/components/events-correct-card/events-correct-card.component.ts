import { Component, OnInit, Input } from '@angular/core';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import {
    IRetrievalEventDto,
    EventsWidgetNotificationStatus,
} from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';

@Component({
    selector: 'evj-events-correct-card',
    templateUrl: './events-correct-card.component.html',
    styleUrls: ['./events-correct-card.component.scss'],
})
export class EventsCorrectCardComponent implements OnInit {
    @Input() public event: IRetrievalEventDto = null;
    @Input() public isClickable: boolean = true;

    public readonly statusesColors: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'standart',
        inWork: 'warning',
        closed: 'danger',
    };

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    public onClickDelete(): void {
        if (!this.isClickable) {
            return;
        }
        const tempInfo: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить связанное мероприятие?',
            acceptText: 'Да, удалить',
            cancelText: 'Отмена',
            acceptFunction: () => this.ewService.deleteRetrievalEvent(this.event),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.ewService.ewAlertInfo$.next(tempInfo);
    }

    public onClickUnlink(): void {
        if (!this.isClickable) {
            return;
        }
        const tempInfo: IAlertWindowModel = {
            isShow: true,
            questionText:
                'Вы уверены, что хотите удалить связь между событиями? Связанное событие не будет удалено.',
            acceptText: 'Да, удалить связь',
            cancelText: 'Отмена',
            acceptFunction: () =>
                this.ewService.deleteRetrievalLink(this.event.innerNotificationId),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.ewService.ewAlertInfo$.next(tempInfo);
    }

    public onClickEdit(): void {
        if (!this.isClickable) {
            return;
        }
        this.ewService.editEvent(this.event.innerNotificationId);
    }

    public onClickCard(): void {
        if (!this.isClickable) {
            return;
        }
        this.ewService.editEvent(this.event.innerNotificationId);
    }

    // private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
    //     this.ewService.isLoading = true;
    //
    //     this.ewService.editEvent(value);
    //
    //     setTimeout(() => (this.ewService.isLoading = false), 500);
    //
    //     // this.progressLine();
    // }
}
