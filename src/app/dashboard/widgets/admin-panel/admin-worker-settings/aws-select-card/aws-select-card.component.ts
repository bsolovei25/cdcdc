import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IWorkerOptionAdminPanel, IBrigadeAdminPanel } from '../../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { MatSelectChange } from '@angular/material/select';
import { IBrigade } from '../../../../models/shift.model';

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

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.allBrigades = this.adminService.brigades;
    }

    public onEditClick(): void {
        if (this.selectEdit.isEmpty()) {
            this.selectEdit.select(true);
        } else {
            const brigade: IBrigadeAdminPanel = this.adminService.brigades.find(
                (item) => item.brigadeNumber === this.inputedValue
            );
            const returnedData = brigade
                ? { id: brigade.brigadeId, number: +brigade.brigadeNumber }
                : null;
            this.saveChanging.emit(returnedData);
            this.option.value = this.inputedValue;
            this.selectEdit.clear();
        }
    }

    public onChangeSelect(event: MatSelectChange): void {
        this.inputedValue = event.value;
    }

    public onCloseClick(): void {
        this.selectEdit.clear();
    }
}
