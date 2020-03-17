import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkerOptionAdminPanel } from '../../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-aws-card',
    templateUrl: './aws-card.component.html',
    styleUrls: ['./aws-card.component.scss'],
})
export class AwsCardComponent implements OnInit {
    @Input() public option: IWorkerOptionAdminPanel = {
        value: '',
        name: '',
        key: '',
    };
    @Output() public saveChanging: EventEmitter<IWorkerOptionAdminPanel> = new EventEmitter<
        IWorkerOptionAdminPanel
    >();
    private inputedValue: string = '';

    public selectEdit: SelectionModel<boolean> = new SelectionModel<boolean>(true);

    constructor() {}

    public ngOnInit(): void {}

    public onEditClick(): void {
        if (this.selectEdit.isEmpty()) {
            this.selectEdit.select(true);
        } else if (this.inputedValue) {
            this.saveChanging.emit({ value: this.inputedValue, key: this.option.key });
            this.option.value = this.inputedValue;
            this.selectEdit.clear();
        } else {
            this.selectEdit.clear();
        }
    }

    public onCloseClick(): void {
        this.selectEdit.clear();
    }

    public onInput(event: string): void {
        this.selectEdit.clear();

        this.inputedValue = event;
    }
}
