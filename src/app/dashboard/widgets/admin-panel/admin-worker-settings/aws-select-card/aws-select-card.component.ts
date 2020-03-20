import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { IWorkerOptionAdminPanel, IBrigadeAdminPanel } from '../../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { IBrigade } from '../../../../models/shift.model';
import { FormControl } from '@angular/forms';
import { IUnitEvents } from '../../../../models/events-widget';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-aws-select-card',
    templateUrl: './aws-select-card.component.html',
    styleUrls: ['./aws-select-card.component.scss'],
})
export class AwsSelectCardComponent implements OnInit, OnDestroy {
    @Input() public option: IWorkerOptionAdminPanel = {
        value: '',
        name: '',
        key: '',
    };
    @Output() public saveChanging: EventEmitter<IBrigade | IUnitEvents> = new EventEmitter<
        IBrigade | IUnitEvents
    >();

    public allItems: IBrigadeAdminPanel[] | IUnitEvents[] = [];

    public selectEdit: SelectionModel<boolean> = new SelectionModel<boolean>(true);

    public select: FormControl = new FormControl();

    public isBrigadeSelect: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (this.option.key === 'brigade') {
            this.isBrigadeSelect = true;
            this.subscriptions.push(
                this.adminService.activeUnitBrigades$.subscribe(
                    (brigades: IBrigadeAdminPanel[]) => (this.allItems = brigades)
                )
            );
            // this.allItems = this.adminService.brigades;
        } else if (this.option.key === 'unit') {
            this.isBrigadeSelect = false;
            this.allItems = this.adminService.units;
        }

        this.select.setValue(this.option.value);
        this.select.disable();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public onChangeSelect(): void {
        if (this.isBrigadeSelect) {
            const brigade: IBrigadeAdminPanel = this.adminService.brigades.find(
                (item) => item.brigadeNumber === this.select.value
            );
            const returnedData = brigade
                ? { id: brigade.brigadeId, number: brigade.brigadeNumber }
                : null;
            this.saveChanging.emit(returnedData);
        } else {
            const unit: IUnitEvents = this.adminService.units.find(
                (item) => item.name === this.select.value
            );
            this.adminService.activeWorkerUnit$.next(unit);
            const returnedData = unit ? unit : null;
            this.saveChanging.emit(returnedData);
        }

        this.option.value = this.select.value;
        this.select.disable();
        this.selectEdit.clear();
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
