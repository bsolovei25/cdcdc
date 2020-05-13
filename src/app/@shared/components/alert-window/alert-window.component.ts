import { Component, Input, OnInit } from '@angular/core';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Component({
    selector: 'evj-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss']
})
export class AlertWindowComponent implements OnInit {

    @Input()
    public info: IAlertWindowModel;

    constructor() {
    }

    public ngOnInit(): void {
        if (!this.info) {
            this.info = {
                isShow: false,
                questionText: '',
                acceptText: 'Подтвердить',
                cancelText: 'Вернуться',
            } as IAlertWindowModel;
        }
    }

    public accept(): void {
        this.info.acceptFunction();
        this.info.closeFunction();
    }

    public cancel(): void {
        try {
            this.info.cancelFunction();
        } catch (err) {
            console.error(err);
        } finally {
            this.info.closeFunction();
        }
    }
}
