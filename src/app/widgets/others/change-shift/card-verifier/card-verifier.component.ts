import { Component, Input, OnInit } from '@angular/core';
import { IVerifyWindow, ShiftMember } from '../../../../dashboard/models/EVJ/shift.model';
import { ShiftService } from '../../../../dashboard/services/widgets/EVJ/shift.service';
import { IUser } from '../../../../dashboard/models/EVJ/events-widget';

@Component({
    selector: 'evj-card-verifier',
    templateUrl: './card-verifier.component.html',
    styleUrls: ['./card-verifier.component.scss'],
})
export class CardVerifierComponent implements OnInit {
    @Input() public verifyInfo: IVerifyWindow;

    constructor(public shiftService: ShiftService) {}

    ngOnInit() {}

    public result(): void {
        setTimeout(() => {});
    }

    public closeVerifyWindow(): void {
        this.shiftService.actionVerifyWindow(
            'close',
            'card',
            this.verifyInfo.widgetId,
            'Отмена операции',
            false,
            this.verifyInfo.verifyId
        );
    }
}
