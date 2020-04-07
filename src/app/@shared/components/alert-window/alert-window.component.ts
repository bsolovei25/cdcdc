import { Component, Input, OnInit } from '@angular/core';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Component({
  selector: 'evj-alert-window',
  templateUrl: './alert-window.component.html',
  styleUrls: ['./alert-window.component.scss']
})
export class AlertWindowComponent implements OnInit {

    @Input() public info: IAlertWindowModel;

    constructor() { }

    ngOnInit(): void {
    }

    public accept(): void {
        this.info.acceptFunction();
        this.info.cancelFunction();
    }

    public cancel(): void {
        this.info.cancelFunction();
    }
}
