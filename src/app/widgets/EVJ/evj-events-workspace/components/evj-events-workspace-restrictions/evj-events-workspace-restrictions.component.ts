import { Component, OnInit } from '@angular/core';
import { IRestrictionItemList, IUser } from "@dashboard/models/EVJ/events-widget";
import { EventsWorkspaceService } from '@dashboard/services/widgets/EVJ/events-workspace.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { EventService } from "@dashboard/services/widgets/EVJ/event.service";
import { from, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { SnackBarService } from "@dashboard/services/snack-bar.service";

@Component({
    selector: 'evj-evj-events-workspace-restrictions',
    templateUrl: './evj-events-workspace-restrictions.component.html',
    styleUrls: ['./evj-events-workspace-restrictions.component.scss'],
})
export class EvjEventsWorkspaceRestrictionsComponent implements OnInit {
    public users: IUser[];

    public isLoading: boolean;

    public restrictionList$: Observable<IRestrictionItemList>;

    public form: FormGroup = new FormGroup({
        id: new FormControl(),
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

    constructor(private ewService: EventsWorkspaceService, private popoverRef: PopoverRef, private eventService: EventService, private snackBar: SnackBarService) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.popoverRef.close('backdropClick', {});
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.restrictionList$ = this.getRestrictionList()
            .pipe(tap((list) => this.fillForm(list)));
        this.users = this.popoverRef.data?.users;
        this.form.get('owner').setValue(this.users[0]?.displayName + ' ' + this.users[0]?.positionDescription);
    }

    public cancel(): void {
        this.popoverRef.close('close', {});
    }

    public accept(): void {
        const strBeg = ' - ';
        const strEnd = '\n';
        if (!this.ewService.event.id) {
            this.snackBar.openSnackBar('Для добавления ограничения необходимо сначала сохранить событие');
            return;
        }
        try {
            this.isLoading = true;
            this.clearDescriptionLimitationsBySeparator(this.SEPARATOR);
            this.ewService.event.description =
                this.ewService.event.description +
                strEnd +
                this.SEPARATOR +
                strEnd +
                strBeg +
                this.form.get('eventType').value?.name +
                ' ограничение' +
                strEnd +
                strBeg +
                'Тип: ' +
                this.form.get('type').value?.name +
                strEnd +
                this.SEPARATOR;

            [
                'Причина: ' + this.form.get('reason').value?.name,
                'Постоянство: ' + this.form.get('constancy').value?.name,
                'Длительность: ' + this.form.get('duration').value?.name,
                'Экономическая эффективность: ' + this.form.get('economicEfficiency').value?.name,
                'Значимость: ' + this.form.get('significance').value?.name,
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

        this.sendRestriction()
            .then(() => this.saveAcceptedEvent())
            .then(() => this.isLoading = false)
            .then(() => this.popoverRef.close())
            .catch()
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

    private sendRestriction(): Promise<unknown> {
        return this.eventService.setRestrictions(this.ewService.event.id, this.form.value);
    }

    private saveAcceptedEvent(): Promise<unknown> {
        this.ewService.event.isRestrictions = true;
        return this.ewService.saveEvent();
    }

    private getRestrictionList(): Observable<IRestrictionItemList> {
        return from(this.eventService.getRestrictions())
            .pipe(map(restrictionItems => {
                return restrictionItems.reduce((prev, curr) => {
                    prev[curr.type] = { ...curr };
                    return prev;
                }, {}) as IRestrictionItemList;
            }))
    }

    private clearDescriptionLimitationsBySeparator(separator: string): void {
        const arr = this.ewService.event.description.split(separator);
        if (arr[1]) {
            const strToReplace = separator + arr[1] + separator;
            this.ewService.event.description = this.ewService.event.description.replace(strToReplace, '\b');
        }
    }

    private fillForm(restrictionList: IRestrictionItemList): void {
        this.form.get('id').setValue(this.ewService.event.id);
        this.form.get('eventType').setValue(restrictionList.eventType.restrictions[0]);
        this.form.get('type').setValue(restrictionList.type.restrictions[0]);
        this.form.get('reason').setValue(restrictionList.reason.restrictions[0]);
        this.form.get('constancy').setValue(restrictionList.constancy.restrictions[0]);
        this.form.get('duration').setValue(restrictionList.duration.restrictions[0]);
        this.form.get('economicEfficiency').setValue(restrictionList.economicEfficiency.restrictions[0]);
        this.form.get('significance').setValue(restrictionList.significance.restrictions[0]);
        this.isLoading = false;
    }
}
