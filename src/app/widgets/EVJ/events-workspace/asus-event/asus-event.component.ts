import { Component, OnInit } from '@angular/core';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/events-workspace.service';
import { EventService } from '../../../../dashboard/services/widgets/event.service';
import { SnackBarService } from '../../../../dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-asus-event',
    templateUrl: './asus-event.component.html',
    styleUrls: ['./asus-event.component.scss'],
})
export class AsusEventComponent implements OnInit {
    public reasons: string[] = [
        'Причина 1',
        'Причина 2',
        'Причина 3',
        'Причина 4',
        'Причина 5',
        'Причина 6',
    ];

    public isReasonsPopupOpen: boolean = false;

    constructor(
        public ewService: EventsWorkspaceService,
        public eventService: EventService,
        public snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(
        message: IChatMessageWithAttachments,
        msgType: 'comments' | 'facts'
    ): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public async setUnit(event: string): Promise<void> {
        this.ewService.isLoading = true;
        try {
            const saveMethod = await this.eventService.getSaveMethod(this.ewService.event);
            this.ewService.asusEquipments = await this.eventService.getAsusEquipments(
                event,
                saveMethod
            );
            this.ewService.event.asusEvent.equipment = null;
            this.ewService.event.asusEvent.eoService = null;
        } catch (e) {
            console.error(e);
        } finally {
            this.ewService.isLoading = false;
        }
    }

    public async setEquipment(event: string): Promise<void> {
        this.ewService.isLoading = true;
        try {
            const saveMethod = await this.eventService.getSaveMethod(this.ewService.event);
            this.ewService.asusEOServices = await this.eventService.getAsusEOServices(
                event,
                saveMethod
            );
            this.ewService.event.asusEvent.eoService = null;
        } catch (e) {
            console.error(e);
        } finally {
            this.ewService.isLoading = false;
        }
    }

    public isCreateEvent(): boolean {
        return !this.ewService.isCreateNewEvent;
    }

    public isAvailableOption(type: string): boolean {
        switch (type) {
            case 'eoService':
                return !!(
                    this.ewService.event.asusEvent.tmPlace &&
                    this.ewService.event.asusEvent.equipment
                );
            case 'equipment':
                return !!this.ewService.event.asusEvent.tmPlace;
        }
    }

    optionClick(type: string): void {
        if (this.isAvailableOption(type)) {
            return;
        }
        switch (type) {
            case 'equipment':
                this.snackBarService.openSnackBar('Заполните поле Установка!', 'snackbar-red');
                break;
            case 'eoService':
                this.snackBarService.openSnackBar(
                    'Заполните поля Установка и Оборудование!',
                    'snackbar-red'
                );
                break;
        }
    }

    public showDate(dateIso: string): string {
        if (!dateIso) {
            return '';
        }
        const date = new Date(dateIso);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day}.${month}.${year} | ${hours}:${minutes}`;
    }
}