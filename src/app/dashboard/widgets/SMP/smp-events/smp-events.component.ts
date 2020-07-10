import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { WidgetPlatform } from '../../../models/widget-platform';
import { SmpEventsService } from '../../../services/widgets/smp-events.service';
import { ISmpEventCard, ISmpEventStatus } from '../../../models/SMP/smp-events.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-smp-events',
    templateUrl: './smp-events.component.html',
    styleUrls: ['./smp-events.component.scss'],
})
export class SmpEventsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public stats: ISmpEventStatus[] = [];
    public cards: ISmpEventCard[] = [];

    static itemCols: number = 14;
    static itemRows: number = 20;

    public selectCard: SelectionModel<ISmpEventCard> = new SelectionModel<ISmpEventCard>();

    constructor(
        protected widgetService: WidgetService,
        private eventService: SmpEventsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getData();
        this.subscriptions.push(
            this.eventService.event$.subscribe((data) => {
                const card = this.cards.find((item) => item?.id === data?.id);
                this.selectCard.select(card);
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    private async getData(): Promise<void> {
        try {
            this.stats = (await this.eventService.getStats())?.statsByStatus ?? [];
            this.cards =
                (await this.eventService.getEventsByFilter(+this.stats[0].status.code)) ?? [];
        } catch (error) {}
    }

    public async onChangeStatus(code: number): Promise<void> {
        this.cards = (await this.eventService.getEventsByFilter(code)) ?? [];
    }

    public async onClickEvent(event: ISmpEventCard): Promise<void> {
        try {
            this.eventService.isLoading = true;
            this.eventService.event = await this.eventService.getFullEvent(event.id);
        } catch (error) {
        } finally {
            setTimeout(() => (this.eventService.isLoading = false), 500);
        }
    }
}
