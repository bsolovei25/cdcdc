import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators } from '@angular/forms';
import { IWorkerOptionAdminPanel } from '../../../../../../dashboard/models/ADMIN/admin-panel.model';

@Component({
    selector: 'evj-aws-card',
    templateUrl: './aws-card.component.html',
    styleUrls: ['./aws-card.component.scss'],
})
export class AwsCardComponent implements OnInit {
    @Input() public isCreateNewUser: boolean = false;
    @Input() public option: IWorkerOptionAdminPanel = {
        value: '',
        name: '',
        key: '',
    };
    @Input() public disabled: boolean = false;

    @Output() public saveChanging: EventEmitter<IWorkerOptionAdminPanel> = new EventEmitter<IWorkerOptionAdminPanel>();

    @ViewChild('input') private input: ElementRef;

    private isCloseClick: boolean = false;

    public inputFormControl: FormControl = new FormControl({ value: '', disabled: true });

    public placeholder: string = '';

    //#region MASK
    public prefix: string = '';
    public mask: string = '';
    public showMaskTyped: boolean = false;
    //#endregion

    public selectEdit: SelectionModel<void> = new SelectionModel<void>();

    constructor() {}

    public ngOnInit(): void {
        this.inputFormControl.disable();
        if (this.isCreateNewUser) {
            this.selectEdit.toggle();
            this.inputFormControl.enable();
        }
        this.inputFormControl.setValue(this.option.value);

        switch (this.option.key) {
            case 'login':
                this.inputFormControl.setValidators([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.pattern(/[a-zA-Z0-9]+/),
                ]);
                this.placeholder = 'login';
                break;
            case 'phone':
                this.inputFormControl.setValidators([Validators.pattern(/[0-9]{10}/)]);
                this.prefix = '+7 ';
                this.mask = '(000) 000-00-00';
                this.showMaskTyped = true;
                this.placeholder = '0000000000';
                break;
            case 'email':
                this.inputFormControl.setValidators([
                    Validators.email,
                    Validators.pattern(/[a-zA-Z0-9.-_]+@[a-zA-Z0-9-]+\.[a-zA-Z]+/),
                ]);
                this.placeholder = 'example@example.ru';
                break;
        }
    }

    public setFieldValue(value: string): string {
        return value ? value : '';
    }

    public onEditClick(): void {
        this.isCloseClick = false;
        this.selectEdit.toggle();
        this.inputFormControl.enable();
        this.input.nativeElement.focus();
    }

    public onCloseClick(): void {
        this.isCloseClick = true;
        this.selectEdit.clear();
        this.inputFormControl.disable();
    }

    public onInput(event: string): void {
        if (!this.isCloseClick && this.inputFormControl.valid) {
            this.saveChanging.emit({ value: this.inputFormControl.value, key: this.option.key });
            this.option.value = this.inputFormControl.value;
        }
        if (!this.isCreateNewUser) {
            this.selectEdit.clear();
            this.inputFormControl.disable();
        }
    }
}
