import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';

@Component({
    selector: 'evj-evj-events-workspace-restrictions',
    templateUrl: './evj-events-workspace-restrictions.component.html',
    styleUrls: ['./evj-events-workspace-restrictions.component.scss'],
})
export class EvjEventsWorkspaceRestrictionsComponent implements OnInit {
    public users: IUser[];

    public eventTypes: string[] = ['Плановое', 'Внеплановое'];

    public types: string[] = ['Динамическое оборудование'];

    public reasons: string[] = ['Поломка'];

    public constancies: string[] = ['Новое'];

    public durations: string[] = ['Краткосрочное'];

    public economicEfficiencies: string[] = ['Низкая'];

    public significances: string[] = ['Малозначимое'];

    public form: FormGroup = new FormGroup({
        eventType: new FormControl(),
        type: new FormControl(),
        reason: new FormControl(),
        constancy: new FormControl(),
        duration: new FormControl(),
        economicEfficiency: new FormControl(),
        significance: new FormControl(),
        owner: new FormControl(),
    });

    private readonly SEPARATOR: string = '***';

    constructor(private ewService: EventsWorkspaceService, private popoverRef: PopoverRef) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.popoverRef.close('backdropClick', {});
        });
    }

    ngOnInit(): void {
        this.fillForm();
        this.users = this.popoverRef.data?.users;
        this.form.get('owner').setValue(this.users[0]?.displayName + ' ' + this.users[0]?.positionDescription);
    }

    public cancel(): void {
        this.popoverRef.close('close', {});
    }

    public accept(): void {
        const strBeg = ' - ';
        const strEnd = '\n';
        try {
            this.clearDescriptionLimitationsBySeparator(this.SEPARATOR);

            this.ewService.event.description =
                this.ewService.event.description +
                strEnd +
                this.SEPARATOR +
                strEnd +
                strBeg +
                this.form.get('eventType').value +
                ' ограничение' +
                strEnd +
                strBeg +
                'Тип: ' +
                this.form.get('type').value +
                strEnd +
                this.SEPARATOR;

            [
                'Причина: ' + this.form.get('reason').value,
                'Постоянство: ' + this.form.get('constancy').value,
                'Длительность: ' + this.form.get('duration').value,
                'Экономическая эффективность: ' + this.form.get('economicEfficiency').value,
                'Значимость: ' + this.form.get('significance').value,
                'Владелец: ' + this.form.get('owner').value,
            ].forEach((item) => {
                this.ewService.event.facts.push({
                    comment: item,
                    displayName: null,
                    createdAt: new Date(),
                });
            });
        } catch (error) {
            console.error(error);
        }
        this.popoverRef.close();
    }

    public discard(): void {
        const alertWindow: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены что хотите сбросить Ограничения?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.clearDescriptionLimitationsBySeparator(this.SEPARATOR);
                this.ewService.event.isRestrictions = false;
            },
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.cancel();
        this.ewService.ewAlertInfo$.next(alertWindow);
    }

    private clearDescriptionLimitationsBySeparator(separator: string): void {
        const arr = this.ewService.event.description.split(separator);
        if (arr[1]) {
            const strToReplace = separator + arr[1] + separator;
            this.ewService.event.description = this.ewService.event.description.replace(strToReplace, '\b');
        }
    }

    private fillForm(): void {
        this.form.get('eventType').setValue(this.eventTypes[0]);
        this.form.get('type').setValue(this.types[0]);
        this.form.get('reason').setValue(this.reasons[0]);
        this.form.get('constancy').setValue(this.constancies[0]);
        this.form.get('duration').setValue(this.durations[0]);
        this.form.get('economicEfficiency').setValue(this.economicEfficiencies[0]);
        this.form.get('significance').setValue(this.significances[0]);
    }
}
