import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IWorkerOptionAdminPanel, IBrigadeAdminPanel } from '../../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { IBrigade } from '../../../../models/shift.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-aws-select-card',
    templateUrl: './aws-select-card.component.html',
    styleUrls: ['./aws-select-card.component.scss'],
})
export class AwsSelectCardComponent implements OnInit {
    @Input() public option: IWorkerOptionAdminPanel = {
        value: '',
        name: '',
        key: '',
    };
    @Output() public saveChanging: EventEmitter<IBrigade> = new EventEmitter<IBrigade>();
    private inputedValue: string = '';

    public allBrigades: IBrigadeAdminPanel[] = [];

    public selectEdit: SelectionModel<boolean> = new SelectionModel<boolean>(true);

    public select: FormControl = new FormControl();

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.allBrigades = this.adminService.brigades;
        this.select.setValue(this.option.value);
        this.select.disable();
    }

    public onEditClick(): void {
        if (this.selectEdit.isEmpty()) {
            this.selectEdit.select(true);
            this.select.enable();
        }
    }

    public onChangeSelect(): void {
        const brigade: IBrigadeAdminPanel = this.adminService.brigades.find(
            (item) => item.brigadeNumber === this.select.value
        );
        const returnedData = brigade
            ? { id: brigade.brigadeId, number: +brigade.brigadeNumber }
            : null;
        this.saveChanging.emit(returnedData);
        this.option.value = this.select.value;
        this.select.disable();
        this.selectEdit.clear();
    }

    public onCloseClick(): void {
        this.select.disable();
        this.selectEdit.clear();
    }
}
