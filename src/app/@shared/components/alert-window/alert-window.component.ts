import { Component, Input, OnInit } from '@angular/core';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss'],
})
export class AlertWindowComponent implements OnInit {
    @Input() public info: IAlertWindowModel;

    public readonly attentionTitle: string = 'Обратите внимание';
    public readonly editTitle: string = 'Редактирование информации';

    public readonly attentionIcon: string = 'assets/icons/widgets/alert-window/attention.svg';
    public readonly editIcon: string = 'assets/icons/widgets/alert-window/edit.svg';
    public readonly closeIcon: string = 'assets/icons/widgets/alert-window/close.svg';

    constructor() {}

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
        try {
            this.info.acceptFunction();
        } catch (err) {
            console.warn(err);
        } finally {
            this.info.closeFunction();
        }
    }

    public cancel(): void {
        try {
            this.info.cancelFunction();
        } catch (err) {
            console.warn(err);
        } finally {
            this.info.closeFunction();
        }
    }

    public setInputStyle(): string {
        const ctrl: FormControl = this.info.input.formControl;
        return ctrl.dirty ? 'input_dirty' : ctrl.invalid && ctrl.touched ? 'input_invalid' : '';
    }
}
