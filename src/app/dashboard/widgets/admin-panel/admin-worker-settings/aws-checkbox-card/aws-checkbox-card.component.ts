import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkerOptionAdminPanel, IBrigadeAdminPanel } from '../../../../models/admin-panel';
import { IBrigade } from '../../../../models/shift.model';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-checkbox-card',
    templateUrl: './aws-checkbox-card.component.html',
    styleUrls: ['./aws-checkbox-card.component.scss'],
})
export class AwsCheckboxCardComponent implements OnInit {
    @Output() private checked: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isChecked: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public onClick(): void {
        this.isChecked = !this.isChecked;
        this.checked.emit(this.isChecked);
    }
}
