import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClaimService } from '@dashboard/services/claim.service';
import { IEventsWidgetNotificationPreview } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/EVJ/event.service';

@Component({
    selector: 'evj-evj-event-card-block',
    templateUrl: './evj-event-card-block.component.html',
    styleUrls: ['./evj-event-card-block.component.scss'],
})
export class EvjEventCardBlockComponent implements OnInit {
    @Input() data: IEventsWidgetNotificationPreview;
    @Input() public cardActiveId: number = 0;
    @Input() public isVideoWall: boolean = false;
    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();

    public removeClaim: boolean;

    constructor(
        private eventService: EventService,
        private claimService: ClaimService
    ) {}

    ngOnInit(): void {
        this.checkClaim();
    }

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(event: MouseEvent, id: number): void {
        event.stopPropagation();
        this.cardDeleteClick.emit(id);
    }

    public async changeIsAcknowledged(event: MouseEvent, eventCard: IEventsWidgetNotificationPreview): Promise<void> {
        event.stopPropagation();
        eventCard.isAcknowledged = !eventCard.isAcknowledged;
        try {
            await this.eventService.changeEventIsAcknowledged(eventCard.id, eventCard.isAcknowledged);
        } catch (error) {
            console.error('EVENT CARD ERROR -> IsAcknowledged', error);
        }
    }

    private checkClaim(): void {
        const claim = this.claimService.allUserClaims$.getValue().find(({ claimType }) => claimType === 'eventsDelete');
        this.removeClaim = claim?.claimCategory === 'allow';
    }
}
