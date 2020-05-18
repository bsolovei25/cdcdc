import { Component, Input, OnInit } from '@angular/core';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Component({
    selector: 'evj-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss'],
})
export class AlertWindowComponent implements OnInit {
    @Input() public info: IAlertWindowModel;

    public title: string = '';
    public iconSrc: string = '';

    private readonly attentionIcon: string = 'assets/icons/widgets/alert-window/notice.svg';
    private readonly editIcon: string = 'assets/icons/widgets/alert-window/edit-icon.svg';

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

        this.title = this.info.input ? 'Редактирование информации' : 'Обратите внимание';
        this.iconSrc = this.info.input ? this.editIcon : this.attentionIcon;
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
