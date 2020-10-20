import { Component, Input, OnInit } from '@angular/core';
import { IVerifyWindow } from '../../../../dashboard/models/EVJ/shift.model';
import { ShiftService } from '../../../../dashboard/services/shift.service';

@Component({
    selector: 'evj-usb-verifier',
    templateUrl: './usb-verifier.component.html',
    styleUrls: ['./usb-verifier.component.scss'],
})
export class UsbVerifierComponent implements OnInit {
    @Input() public verifyInfo: IVerifyWindow;

    constructor(private shiftService: ShiftService) {}

    public ngOnInit(): void {}

    public closeVerifyWindow(): void {
        this.shiftService.actionVerifyWindow(
            'close',
            'usb',
            this.verifyInfo.widgetId,
            'Отмена операции',
            false,
            this.verifyInfo.verifyId
        );
    }
}
