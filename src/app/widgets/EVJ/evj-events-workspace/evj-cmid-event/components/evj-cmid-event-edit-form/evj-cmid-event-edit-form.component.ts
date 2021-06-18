import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChatMessageWithAttachments } from '../../../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '@dashboard/services/widgets/EVJ/events-workspace.service';
import { CmidEventToogleValue } from '../../components/evj-cmid-event-toggle/evj-cmid-event-toggle.component';
import { CmidDictionaryService } from '@dashboard/services/widgets/CMID/cmid-dictionary.service';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { IDirectoryData, IDirectoryRow } from '@dashboard/services/widgets/CMID/cmid-dictionary.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';
import { IPlanItem } from '@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { IManufacture, IPlant } from '@dashboard/services/widgets/CMID/cmid.interface';
import { IKDPAZRequest } from '@widgets/EVJ/evj-events-workspace/evj-cmid-event/components/evj-cmid-event-edit-form/evj-cmid-event-edit-form.interfaces';

import * as moment from 'moment';

@DecorateUntilDestroy()
@Component({
    selector: 'evj-cmid-event-edit-form',
    templateUrl: './evj-cmid-event-edit-form.component.html',
    styleUrls: ['./evj-cmid-event-edit-form.component.scss'],
})
export class EvjCmidEventEditFormComponent implements OnInit, OnDestroy {
    private currentQuery: string = '';
    public dateNow: Date = new Date();
    public toggleValue: CmidEventToogleValue = 'plan';

    public typeOfReason$: Observable<IDirectoryData[]> = this.cmidDictionaryService.getTypeOfReason();
    public reasonsOfDisconnect$: Observable<IDirectoryRow[]>;

    public plants$: Observable<IPlant[]> = this.cmidDictionaryService.getPlants('1');
    public manufactures$: Observable<IManufacture[]> = this.cmidDictionaryService.getManufactures();
    public units$: Observable<IManufacture[]>;
    public positions$: Observable<IPlanItem[]>;

    public typeOfReasonControl: FormControl = new FormControl();
    public reasonsOfDisconnectControl: FormControl = new FormControl();

    public kdcards: FormControl = new FormControl('');

    public filterForm: FormGroup = new FormGroup({
        selectPlant: new FormControl({ id: '1', name: 'ОНПЗ' }),
        selectManufacture: new FormControl(null),
        selectUnit: new FormControl(null),
    });

    public positionLoading$: Subject<boolean> = new Subject<boolean>();

    constructor(public ewService: EventsWorkspaceService, private cmidDictionaryService: CmidDictionaryService) {}

    public ngOnInit(): void {
        this.subscriptionToTypeOfReasonControls();
        this.subscriptionToManufactureControl();
        this.subscriptionToUnitControl();
        this.subscriptionToKDPAZCards();
        this.subscriptionToEventSentToSave();
        // Инициализация пустого обьекта для reasonForDisconnection
        this.ewService.event.reasonForDisconnection = {};
        // Установка значения по умолчанию
        this.ewService.event.reasonForDisconnection.eventType = 'plan';
    }

    public ngOnDestroy(): void {}

    public getPositions(manufacture: string, unit: string): void {
        this.positionLoading$.next(true);
        this.positions$ = this.cmidDictionaryService.getKdpazCard(manufacture, unit).pipe(
            map((list) => list.filter(el => this.toggleValue === 'plan' ? el.isDisabledByPlan : !el.isDisabledByPlan)),
            tap((result) => {
                this.positionLoading$.next(false)
            }),
            catchError((e) => {
                this.positionLoading$.next(false);
                return throwError(e);
            })
        );
    }

    public searchPosition(query: string): void {
        this.currentQuery = query;
        this.positionLoading$.next(true);
        this.positions$ = this.cmidDictionaryService.getPositions(this.currentQuery, this.toggleValue).pipe(
            tap((result) => {
                this.positionLoading$.next(false);
            }),
            catchError((e) => {
                this.positionLoading$.next(false);
                return throwError(e);
            })
        );
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

    public setToggleValue(action: CmidEventToogleValue): void {
        this.toggleValue = action;
        this.ewService.event.reasonForDisconnection.eventType = action;
        this.searchPosition(this.currentQuery);
    }

    private subscriptionToManufactureControl(): void {
        this.filterForm
            .get('selectManufacture')
            .valueChanges.pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                this.units$ = this.cmidDictionaryService.getSetups(id);
            });
    }

    private subscriptionToUnitControl(): void {
        this.filterForm
            .get('selectUnit')
            .valueChanges.pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                this.positionLoading$.next(true);
                this.getPositions(this.filterForm.get('selectManufacture').value.id, id);
            });
    }

    private subscriptionToTypeOfReasonControls(): void {
        this.typeOfReasonControl.valueChanges
            .pipe(filter(Boolean), takeUntilDestroyed(this))
            .subscribe((type: string) => {
                this.reasonsOfDisconnect$ = this.cmidDictionaryService.getReasonOfDisconnection(type);
            });
    }

    private subscriptionToEventSentToSave(): void {
        this.ewService.eventSentToSave$
            .pipe(takeUntilDestroyed(this))
            .subscribe(() => {
                this.ewService.event.notificationCreationTime = new Date();
            });
    }

    private subscriptionToKDPAZCards(): void {
        combineLatest([this.kdcards.valueChanges, this.ewService.eventSaved$])
            .pipe(
                filter(([, event]) => !!event?.id),
                takeUntilDestroyed(this),
                switchMap(([kdcards, event]) => {
                    this.ewService.isLoading = true;
                    return this.ewService.saveCmidCards(this.prepareKDPAZCards(event.id, kdcards));
                }),
                catchError((e) => {
                    this.ewService.isLoading = false;
                    return throwError(e);
                })
            )
            .subscribe(() => {
                this.ewService.isLoading = false;
            });
    }

    private prepareKDPAZCards(eventId: number, value: IPlanItem[]): IKDPAZRequest[] {
        return value.map(({ positionId }) => ({
            notificationId: eventId,
            creationDate: new Date().toISOString(),
            positionId,
            plannedShutDownDate: this.ewService.event.startScheduledTime
                ? moment(this.ewService.event.startScheduledTime).toISOString()
                : moment(this.ewService.event.startActualTime).toISOString(),
            plannedInclusionDate: this.ewService.event.endScheduledTime
                ? moment(this.ewService.event.endScheduledTime).toISOString()
                : moment(this.ewService.event.endActualTime).toISOString(),
        }));
    }
}
