import {Component, OnInit, Input} from '@angular/core';
import { IInputOptions } from '@shared/models/input.model';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { UserSettingsService } from '../../../../dashboard/services/user-settings.service';
import { CdMatBalanceService } from '../../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { SnackBarService } from '../../../../dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-cdcp-event',
    templateUrl: './cdcp-event.component.html',
    styleUrls: ['./cdcp-event.component.scss']
})
export class CdcpEventComponent implements OnInit {
    @Input()
    public noOverflow: boolean = false;

    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Номер позиции',
        isMovingPlaceholder: true
    };

    constructor(
        public ewService: EventsWorkspaceService,
        private userService: UserSettingsService,
        private cdMatBalanceService: CdMatBalanceService,
        private snackBar: SnackBarService
    ) {
    }

    ngOnInit(): void {
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSendMessage(
        message: IChatMessageWithAttachments,
        msgType: 'comments' | 'facts'
    ): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public openMnemo(): void {
        if (this.ewService.event.id) {
            this.cdMatBalanceService.isOpenEvent$.next(this.ewService.event);
            this.userService.loadScreenByWidget('cd-mat-balance');
        } else {
            this.snackBar.openSnackBar(
                'Для создания нового события, сохраните текущее!',
                'snackbar-red'
            );
        }
    }
}
