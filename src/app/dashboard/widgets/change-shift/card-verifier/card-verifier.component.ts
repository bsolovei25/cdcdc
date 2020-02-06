import {Component, Input, OnInit} from '@angular/core';
import {ShiftMember} from "../../../models/shift.model";
import {ShiftService} from "../../../services/shift.service";

@Component({
  selector: 'evj-card-verifier',
  templateUrl: './card-verifier.component.html',
  styleUrls: ['./card-verifier.component.scss']
})
export class CardVerifierComponent implements OnInit {

  @Input() public widgetId: string;

  constructor(public shiftService: ShiftService) { }

  ngOnInit() {

  }

  public result(): void {
    setTimeout(() => {});

  }

  public closeVerifyWindow(): void {
    this.shiftService.actionVerifyWindow('close', this.widgetId);
  }

}
