import { Component, Input } from '@angular/core';
import { IAlertInputModel } from '../../models/alert-input.model';

@Component({
    selector: 'evj-alert-input',
    templateUrl: './alert-input.component.html',
    styleUrls: ['./alert-input.component.scss'],
})
export class AlertInputComponent {
    @Input() public info: IAlertInputModel;

    public accept(): void {
        this.info.acceptFunction(this.info.value);
    }

    public cancel(): void {
        this.info.cancelFunction();
    }
}
