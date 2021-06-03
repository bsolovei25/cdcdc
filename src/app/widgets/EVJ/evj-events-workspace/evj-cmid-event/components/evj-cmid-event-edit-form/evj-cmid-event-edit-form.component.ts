import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChatMessageWithAttachments } from '../../../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '@dashboard/services/widgets/EVJ/events-workspace.service';
import { CmidEventToogleValue } from '../../components/evj-cmid-event-toggle/evj-cmid-event-toggle.component';
import { CmidDictionaryService } from '@dashboard/services/widgets/CMID/cmid-dictionary.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IDirectoryData, IDirectoryRow } from '@dashboard/services/widgets/CMID/cmid-dictionary.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';
import { IPlanItem } from '@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface';
import { catchError, tap } from 'rxjs/operators';
import { IManufacture, IPlant } from '@dashboard/services/widgets/CMID/cmid.interface';

@DecorateUntilDestroy()
@Component({
    selector: 'evj-cmid-event-edit-form',
    templateUrl: './evj-cmid-event-edit-form.component.html',
    styleUrls: ['./evj-cmid-event-edit-form.component.scss']
})
export class EvjCmidEventEditFormComponent implements OnInit, OnDestroy {
    public dateNow: Date = new Date();

    public toggleValue: CmidEventToogleValue = 'non-plan';

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

    public positionLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        public ewService: EventsWorkspaceService,
        private cmidDictionaryService: CmidDictionaryService) {}

    public ngOnInit(): void {
        this.subscriptionToTypeOfReasonControls();
        this.subscriptionToManufactureControl();
        this.subscriptionToUnitControl();
    }

    public ngOnDestroy(): void {}

    public getPositions(manufacture: string, unit: string): void {
        this.positionLoading$.next(true);
        this.positions$ = this.cmidDictionaryService
            .getKdpazCard(manufacture, unit)
            .pipe(tap(() => this.positionLoading$.next(false)), catchError((e) => {
                this.positionLoading$.next(false);
                return throwError(e);
            }));
    }

    public searchPosition(query: string): void {
        this.positionLoading$.next(true);
        this.positions$ = this.cmidDictionaryService.getPositions(query).pipe(
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
            .subscribe(({ name }) => {
                this.positionLoading$.next(true);
                this.getPositions(this.filterForm.get('selectManufacture').value.name, name);
            });
    }

    private subscriptionToTypeOfReasonControls(): void {
        this.typeOfReasonControl.valueChanges.pipe(takeUntilDestroyed(this)).subscribe(({ id }) => {
            this.reasonsOfDisconnect$ = this.cmidDictionaryService.getReasonOfDisconnection(id);
        });
    }
}
