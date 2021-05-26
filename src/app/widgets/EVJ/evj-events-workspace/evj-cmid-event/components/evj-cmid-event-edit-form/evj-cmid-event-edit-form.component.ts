import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IChatMessageWithAttachments } from '../../../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '@dashboard/services/widgets/EVJ/events-workspace.service';
import { CmidEventToogleValue } from '../../components/evj-cmid-event-toggle/evj-cmid-event-toggle.component';
import { CmidDictionaryService } from "@dashboard/services/widgets/CMID/cmid-dictionary.service";
import { Observable } from "rxjs";
import { IDirectoryData, IDirectoryRow } from "@dashboard/services/widgets/CMID/cmid-dictionary.interface";
import { tap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { DecorateUntilDestroy, takeUntilDestroyed } from "@shared/functions/take-until-destroed.function";

@DecorateUntilDestroy()
@Component({
    selector: 'evj-cmid-event-edit-form',
    templateUrl: './evj-cmid-event-edit-form.component.html',
    styleUrls: ['./evj-cmid-event-edit-form.component.scss'],
})
export class EvjCmidEventEditFormComponent implements OnInit, OnDestroy {

    public dateNow: Date = new Date();

    public toggleValue: CmidEventToogleValue = 'non-plan';

    public typeOfReason$: Observable<IDirectoryData[]> = this.cmidDictionaryService.getTypeOfReason();
    public reasonsOfDisconnect$: Observable<IDirectoryRow[]>;

    public typeOfReasonControl: FormControl = new FormControl();
    public reasonsOfDisconnectControl: FormControl = new FormControl();

    constructor(public ewService: EventsWorkspaceService, private cmidDictionaryService: CmidDictionaryService) {}

    ngOnInit(): void {
        this.subscriptionToTypeOfReasonControls();
    }

    ngOnDestroy(): void {}

    private subscriptionToTypeOfReasonControls(): void {
        this.typeOfReasonControl.valueChanges
            .pipe(takeUntilDestroyed(this))
            .subscribe(({ id }) => {
                this.reasonsOfDisconnect$ = this.cmidDictionaryService.getReasonOfDisconnection(id);
            });
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

}
