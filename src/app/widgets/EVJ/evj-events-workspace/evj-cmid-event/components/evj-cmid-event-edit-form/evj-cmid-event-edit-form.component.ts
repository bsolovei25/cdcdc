import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { IChatMessageWithAttachments } from "../../../components/evj-chat/evj-chat.component";
import { EventsWorkspaceService } from "@dashboard/services/widgets/EVJ/events-workspace.service";
import { CmidEventToogleValue } from "../../components/evj-cmid-event-toggle/evj-cmid-event-toggle.component";
import { CmidDictionaryService } from "@dashboard/services/widgets/CMID/cmid-dictionary.service";
import { Observable } from "rxjs";
import { IDirectoryData, IDirectoryRow } from "@dashboard/services/widgets/CMID/cmid-dictionary.interface";
import {FormControl, FormGroup} from "@angular/forms";
import { DecorateUntilDestroy, takeUntilDestroyed } from "@shared/functions/take-until-destroed.function";

@DecorateUntilDestroy()
@Component({
    selector: 'evj-cmid-event-edit-form',
    templateUrl: './evj-cmid-event-edit-form.component.html',
    styleUrls: ['./evj-cmid-event-edit-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvjCmidEventEditFormComponent implements OnInit, OnDestroy {

    public dateNow: Date = new Date();

    public toggleValue: CmidEventToogleValue = 'non-plan';

    public typeOfReason$: Observable<IDirectoryData[]> = this.cmidDictionaryService.getTypeOfReason();
    public reasonsOfDisconnect$: Observable<IDirectoryRow[]>;

    // Получение моков
    public plants$: Observable<any> = this.cmidDictionaryService.getPlants('1');
    public manufactures$: Observable<any> = this.cmidDictionaryService.getManufactures();
    public setups$: Observable<any> = this.cmidDictionaryService.getSetups('1');
    public positions$: Observable<any> = this.cmidDictionaryService.getPositions('1');

    public typeOfReasonControl: FormControl = new FormControl();
    public reasonsOfDisconnectControl: FormControl = new FormControl();

    public filterForm: FormGroup = new FormGroup({
        selectPlant: new FormControl({ value: { id: '1', name: 'ФСБ' }, disabled: false }),
        selectManufacture: new FormControl({ value: '', disabled: false }),
        selectSetup: new FormControl({ value: '', disabled: false }),
    });
    public kdcards: FormControl = new FormControl({ value: '', disabled: false });

    constructor(public ewService: EventsWorkspaceService,
                private cmidDictionaryService: CmidDictionaryService) {}

    public ngOnInit(): void {
        this.subscriptionToTypeOfReasonControls();
        this.subscriptionToManufactureControl();
        this.subscriptionToSetupControl();
        this.subscriptionToPositions();
    }

    public ngOnDestroy(): void {}

    public getPositions(manufacture: string, plant: string): void {
        this.positions$ = this.cmidDictionaryService.getKdpazCard(manufacture, plant);
    }

    public searchPosition(query: string): void {
        this.positions$ = this.cmidDictionaryService.getPositions(this.filterForm.get('selectSetup').value.id, query);
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
        return new Date(new Date(this.ewService.event?.deadline).getDate() - new Date(this.ewService.event?.eventDateTime).getDate());
    }

    public setToggleValue(action: CmidEventToogleValue): void {
        this.toggleValue = action;
    }

    private subscriptionToPositions(): void {
        this.filterForm.valueChanges
            .pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                const manufacture = this.filterForm.get('selectManufacture').value.name;
                const plant = this.filterForm.get('selectPlant').value.name;
                console.log(manufacture, plant);
                if (manufacture && plant) {
                    this.getPositions(manufacture, plant);
                }
            });
    }

    private subscriptionToManufactureControl(): void {
        this.filterForm.get('selectManufacture').valueChanges
            .pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                this.setups$ = this.cmidDictionaryService.getSetups(id);
            });
    }

    private subscriptionToSetupControl(): void {
        this.filterForm.get('selectSetup').valueChanges
            .pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                this.positions$ = this.cmidDictionaryService.getPositions(id);
            });
    }

    private subscriptionToTypeOfReasonControls(): void {
        this.typeOfReasonControl.valueChanges
            .pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                this.reasonsOfDisconnect$ = this.cmidDictionaryService.getReasonOfDisconnection(id);
            });
    }

}
