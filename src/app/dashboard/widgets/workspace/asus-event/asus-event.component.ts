import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { IAsusTmPlace, IAsusTpPlace } from '../../../models/events-widget';
import { EventService } from '../../../services/widgets/event.service';

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
        public snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(message: string, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public async setUnit(event: IAsusTmPlace): Promise<void> {
        this.ewService.isLoading = true;
        try {
            const saveMethod = await this.eventService.getSaveMethod(this.ewService.event);
            this.ewService.asusEquipments = await this.eventService.getAsusEquipments(event.codeSap, saveMethod);
            this.ewService.event.asusEvent.equipment = null;
            this.ewService.event.asusEvent.eoService = null;
        } catch (e) {
            console.error(e);
        } finally {
            this.ewService.isLoading = false;
        }
    }

    public async setEquipment(event: IAsusTpPlace): Promise<void> {
        this.ewService.isLoading = true;
        try {
            const saveMethod = await this.eventService.getSaveMethod(this.ewService.event);
            this.ewService.asusEOServices = await this.eventService.getAsusEOServices(event.codeSap, saveMethod);
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
                return !!(this.ewService.event.asusEvent.tmPlace && this.ewService.event.asusEvent.equipment);
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
                this.snackBarService
                    .openSnackBar('Сперва заполните поле Установка!', 'snackbar-red');
                break;
            case 'eoService':
                this.snackBarService
                    .openSnackBar('Сперва заполните поля Установка и Оборудование!', 'snackbar-red');
                break;
        }
    }
}
