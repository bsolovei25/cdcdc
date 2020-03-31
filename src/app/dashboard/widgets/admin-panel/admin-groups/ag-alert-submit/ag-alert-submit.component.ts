import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'evj-ag-alert-submit',
    templateUrl: './ag-alert-submit.component.html',
    styleUrls: ['./ag-alert-submit.component.scss'],
})
export class AgAlertSubmitComponent implements OnChanges {
    @Input() private isSaving: boolean = false;

    @Output() private clickedButton: EventEmitter<boolean> = new EventEmitter<boolean>();

    public textTitle: string = '';
    public buttonPositiveText: string = '';
    public buttonNegativeText: string = '';

    constructor() {}

    public ngOnChanges(): void {
        if (this.isSaving) {
            this.textTitle = `Сохранить внесенные изменения?`;
            this.buttonPositiveText = `Сохранить`;
            this.buttonNegativeText = `Отменить`;
        } else {
            this.textTitle = `Вы действительно хотите вернуться назад?
            Все внесенные изменения будут утрачены.`;

            this.buttonPositiveText = `Подтвердить`;
            this.buttonNegativeText = `Отменить`;
        }
    }

    public onReturn(): void {
        this.clickedButton.emit(false);
    }

    public onSave(): void {
        this.clickedButton.emit(true);
    }
}
