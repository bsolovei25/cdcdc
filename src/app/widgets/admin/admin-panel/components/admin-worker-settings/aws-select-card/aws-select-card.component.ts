import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { IWorkerOptionAdminPanel } from '../../../../../../dashboard/models/ADMIN/admin-panel.model';
import { IUnitEvents } from '../../../../../../dashboard/models/EVJ/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPanelService } from '../../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-select-card',
    templateUrl: './aws-select-card.component.html',
    styleUrls: ['./aws-select-card.component.scss'],
})
export class AwsSelectCardComponent implements OnInit, OnDestroy {
    @Input() public isCreateNewUser: boolean = false;
    @Input() public option: IWorkerOptionAdminPanel = {
        value: '',
        name: '',
        key: '',
    };
    @Output() public saveChanging: EventEmitter<IUnitEvents> = new EventEmitter<IUnitEvents>();

    public allItems: IUnitEvents[] = [];

    public selectEdit: SelectionModel<boolean> = new SelectionModel<boolean>();

    public select: FormControl = new FormControl();

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (this.option.key === 'unit') {
            this.allItems = this.adminService.units;
        }

        if (!this.isCreateNewUser) {
            this.select.setValue(this.option.value);
            this.select.disable();
        } else {
            this.selectEdit.select(true);
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public onChangeSelect(): void {
        const unit: IUnitEvents = this.adminService.units.find((item) => item.name === this.select.value);
        const returnedData = unit ? unit : null;
        this.saveChanging.emit(returnedData);

        this.option.value = this.select.value;
        if (!this.isCreateNewUser) {
            this.select.disable();
            this.selectEdit.clear();
        }
    }

    public onEditClick(): void {
        if (this.selectEdit.isEmpty()) {
            this.selectEdit.select(true);
            this.select.enable();
        }
    }

    public onCloseClick(): void {
        this.select.disable();
        this.selectEdit.clear();
    }
}
