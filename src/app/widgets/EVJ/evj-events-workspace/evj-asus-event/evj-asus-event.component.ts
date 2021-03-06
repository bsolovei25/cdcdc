import { Component, Input, OnInit } from '@angular/core';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { EventService } from '../../../../dashboard/services/widgets/EVJ/event.service';
import { SnackBarService } from '../../../../dashboard/services/snack-bar.service';
import { FormControl } from '@angular/forms';
import { IAsusTpPlace } from '../../../../dashboard/models/EVJ/events-widget';

@Component({
    selector: 'evj-asus-event',
    templateUrl: './evj-asus-event.component.html',
    styleUrls: ['./evj-asus-event.component.scss'],
})
export class EvjAsusEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    public filter: FormControl = new FormControl({ value: '', disabled: true });

    public equipment: IAsusTpPlace[];

    public isReasonsPopupOpen: boolean = false;

    public get registrationDate(): Date {
        if (!this.ewService.event?.externalDate) {
            return null;
        }
        return new Date(this.ewService.event?.externalDate);
    }

    constructor(
        public ewService: EventsWorkspaceService,
        public eventService: EventService,
        public snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.setDefaultResponsible();
        this.setDefaultUnit();
        this.setExistReferences();
        this.filter.valueChanges.subscribe(() => {
            this.filterEquipment();
        });
    }

    private async setExistReferences(): Promise<void> {
        if (!this.ewService.isCreateNewEvent) {
            console.log(this.ewService.event);
            this.setUnit(this.ewService.event.asusEvent.tmPlace);
            this.setEquipment(this.ewService.event.asusEvent.equipment);
        }
    }

    private async setDefaultResponsible(): Promise<void> {
        if (this.ewService.isCreateNewEvent) {
            const responsibleOperator = await this.eventService.getDefaultResponsibleByType('asus');
            this.ewService.event = { ...this.ewService.event, responsibleOperator };
        }
    }

    private setDefaultUnit(): void {
        if (this.ewService.isCreateNewEvent) {
            this.ewService.asusUnits$.subscribe((units) => {
                const asusEvent = this.ewService.event.asusEvent;
                asusEvent.tmPlace = units?.find((u) => u.name.toLowerCase().includes('??????-2'))?.codeSap;
                this.ewService.event = { ...this.ewService.event, asusEvent };
                this.setUnit(asusEvent.tmPlace);
            });
        }
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public async setUnit(event: string): Promise<void> {
        if (!event?.trim()) {
            return;
        }
        this.ewService.isLoading = true;
        try {
            const saveMethod = await this.eventService.getReferenceMethod(this.ewService.event);
            this.ewService.asusEquipments = await this.eventService.getAsusEquipments(
                event,
                saveMethod,
                this.ewService.event?.id
            );
            this.equipment = this.ewService.asusEquipments;
            // this.ewService.event.asusEvent.equipment = null;
            // this.ewService.event.asusEvent.eoService = null;
        } catch (e) {
            console.error(e);
        } finally {
            this.ewService.isLoading = false;
        }
    }

    public async setEquipment(event: string): Promise<void> {
        if (!event?.trim()) {
            event = this.ewService.event.asusEvent.tmPlace;
            if (!event?.trim()) {
                return;
            }
        }
        this.ewService.isLoading = true;
        try {
            const saveMethod = await this.eventService.getReferenceMethod(this.ewService.event);
            this.ewService.asusEOServices = await this.eventService.getAsusEOServices(event, saveMethod);
            // this.ewService.event.asusEvent.eoService = null;
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
                this.snackBarService.openSnackBar('?????????????????? ???????? ??????????????????!', 'error');
                break;
            case 'eoService':
                this.snackBarService.openSnackBar('?????????????????? ???????? ?????????????????? ?? ????????????????????????!', 'error');
                break;
        }
    }

    public clearFilter(): void {
        this.filter.setValue('');
    }

    public setEndDateTimeToEvent(value: Date): void {
        this.ewService.setEventEndDateTime(value);
    }

    public setDeadlineToEvent(value: Date): void {
        this.ewService.setDeadlineToEvent(value);
    }

    private filterEquipment(): void {
        let value = this.filter.value.trim();
        if (!value || value === '') {
            this.equipment = this.ewService.asusEquipments;
            return;
        } else {
            value = value.toLowerCase();
        }
        console.log(this.ewService.asusEquipments);
        this.equipment = this.ewService.asusEquipments.filter(
            (item) => item.name.toLowerCase().indexOf(value) > -1 || item.codeSap.toLowerCase().indexOf(value) > -1
        );
    }
}
