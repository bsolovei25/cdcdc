import {Component, Input, OnInit} from '@angular/core';
import {IVerifyWindow} from "../../../models/shift.model";
import {ShiftService} from "../../../services/shift.service";

@Component({
  selector: 'evj-usb-verifier',
  templateUrl: './usb-verifier.component.html',
  styleUrls: ['./usb-verifier.component.scss']
})
export class UsbVerifierComponent implements OnInit {

  @Input() public verifyInfo: IVerifyWindow;

  constructor(
      private shiftService: ShiftService
  ) { }

  public ngOnInit(): void {
  }

  public closeVerifyWindow(): void {
    this.shiftService.actionVerifyWindow(
        'close',
        null,
        this.verifyInfo.widgetId,
        false,
        this.verifyInfo.verifyId
    );
  }

}
