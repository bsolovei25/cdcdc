import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { EvjEventsSmpoReasonsMenuComponent } from '../components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu.component';
import { EvjEventsSmpoCorrectMenuComponent } from '../components/evj-events-smpo-correct-menu/evj-events-smpo-correct-menu.component';
import { IMenuItem } from '../components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component';
import { Observable, of } from 'rxjs';
import { map, take } from "rxjs/operators";
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { EventService } from '../../../../dashboard/services/widgets/EVJ/event.service';

@Component({
    selector: 'evj-smpo-event',
    templateUrl: './evj-smpo-event.component.html',
    styleUrls: ['./evj-smpo-event.component.scss'],
})
export class EvjSmpoEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    public dateNow: Date = new Date();

    public reasons: IMenuItem[] = [];
    public events: IMenuItem[] = [];
    public phasesList: string[] = [];

    private reasonList: IMenuItem[] = [];
    private eventsList: IMenuItem[] = [];

    constructor(
        public ewService: EventsWorkspaceService,
        private eventService: EventService,
        private popoverOverlayService: PopoverOverlayService,
        private renderer: Renderer2,
        private hostElement: ElementRef
    ) {}

    public ngOnInit(): void {
        // TODO Проинитить данные причин и эвентов?
        this.getReasonsList();
        this.getEventsList();
        this.getPhasesList();
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public countDifference(): Date {
        return new Date(
            new Date(this.ewService.event?.deadline).getDate() - new Date(this.ewService.event?.eventDateTime).getDate()
        );
    }
    // Reasons and correct logic
    public removeEvent(event: IMenuItem): void {
        this.events = this.events.filter((currentEvent) => currentEvent.id !== event.id);
        this.getEventsList();
    }

    public removeReason(reason: IMenuItem): void {
        this.reasons = this.reasons.filter((currentReason) => currentReason.id !== reason.id);
        this.getReasonsList();
    }

    public phasesList$(): Observable<string[]> {
        return this.eventService.getPhaseList()
            .pipe(map(phases => phases.map((phase => phase.name))));
    }

    public reasonList$(): Observable<IMenuItem[]> {
        return this.eventService.getReasons().pipe(
            map((reasons) => reasons.map((reason) => ({ ...reason, isSelected: false })) as IMenuItem[]),
            map((reasons) =>
                reasons.map((reason) => ({
                    ...reason,
                    isSelected: !!this.reasons.find((currentReason) => currentReason.id === reason.id),
                }))
            )
        );
    }

    public eventsList$(): Observable<IMenuItem[]> {
        return this.eventService.getCorrects().pipe(
            map((corrects) => corrects.map((correct) => ({ ...correct, isSelected: false })) as IMenuItem[]),
            map((reasons) =>
                reasons.map((reason) => ({
                    ...reason,
                    isSelected: !!this.reasons.find((currentReason) => currentReason.id === reason.id),
                }))
            )
        );
    }

    public openReasonsList(): void {
        const heightPx = 435;
        const widthPx = 369;

        const limitationWindowTarget = this.createOverlayTarget(heightPx, widthPx);
        const popoverRef = this.popoverOverlayService.open({
            content: EvjEventsSmpoReasonsMenuComponent,
            origin: limitationWindowTarget,
            width: widthPx,
            position: 'end',
            height: heightPx,
            data: this.reasonList,
        });

        popoverRef.afterClosed$.subscribe((res) => {
            this.renderer.removeChild(this.hostElement.nativeElement, limitationWindowTarget);
            if (res.type !== 'backdropClick') {
                this.reasons = res?.data;
            }
        });
    }

    public openEventsList(): void {
        const heightPx = 435;
        const widthPx = 369;

        const limitationWindowTarget = this.createOverlayTarget(heightPx, widthPx);
        const popoverRef = this.popoverOverlayService.open({
            content: EvjEventsSmpoCorrectMenuComponent,
            origin: limitationWindowTarget,
            width: widthPx,
            position: 'end',
            height: heightPx,
            data: this.eventsList,
        });

        popoverRef.afterClosed$.subscribe((res) => {
            this.renderer.removeChild(this.hostElement.nativeElement, limitationWindowTarget);
            if (res.type !== 'backdropClick') {
                this.events = res?.data;
            }
        });
    }

    private getReasonsList(): void {
        this.reasonList$()
            .pipe(take(1))
            .subscribe((list) => {
                this.reasonList = list;
            });
    }

    private getEventsList(): void {
        this.eventsList$()
            .pipe(take(1))
            .subscribe((list) => {
                this.eventsList = list;
            });
    }

    private getPhasesList(): void {
        this.phasesList$()
            .pipe(take(1))
            .subscribe((list) => {
                this.phasesList = list;
            });
    }

    private createOverlayTarget(height: number, width: number): HTMLElement {
        const limitationWindowTarget = this.renderer.createElement('div');
        this.renderer.setStyle(limitationWindowTarget, 'position', `absolute`);
        this.renderer.setStyle(limitationWindowTarget, 'right', `calc(50% - ${width}px / 2)`);
        this.renderer.setStyle(limitationWindowTarget, 'top', `calc(50% + ${height}px / 2)`);
        this.renderer.appendChild(this.hostElement.nativeElement, limitationWindowTarget);
        return limitationWindowTarget;
    }
}
