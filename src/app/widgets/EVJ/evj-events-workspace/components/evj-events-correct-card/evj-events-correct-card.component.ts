import { Component, OnInit, Input } from '@angular/core';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import {
    IRetrievalEventDto,
    EventsWidgetNotificationStatus,
    IUser,
} from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';

@Component({
    selector: 'evj-events-correct-card',
    templateUrl: './evj-events-correct-card.component.html',
    styleUrls: ['./evj-events-correct-card.component.scss'],
})
export class EvjEventsCorrectCardComponent implements OnInit {
    @Input() public event: IRetrievalEventDto = null;
    @Input() public isClickable: boolean = true;

    public responsible: IUser = null;

    public readonly statusesColors: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'standart',
        inWork: 'warning',
        closed: 'danger',
        wasted: 'standart',
    };

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    public onClickDelete(event: MouseEvent): void {
        event.stopPropagation();
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

    public onClickUnlink(event: MouseEvent): void {
        event.stopPropagation();
        if (!this.isClickable) {
            return;
        }
        const tempInfo: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить связь между событиями? Связанное событие не будет удалено.',
            acceptText: 'Да, удалить связь',
            cancelText: 'Отмена',
            acceptFunction: () => this.ewService.deleteRetrievalLink(this.event.innerNotificationId),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.ewService.ewAlertInfo$.next(tempInfo);
    }

    public onClickEdit(event: MouseEvent): void {
        event.stopPropagation();
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
}
