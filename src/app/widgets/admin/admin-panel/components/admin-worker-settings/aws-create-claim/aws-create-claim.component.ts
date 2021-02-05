import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IWidget } from '../../../../../../dashboard/models/widget.model';
import { IGlobalClaim } from '../../../../../../dashboard/models/ADMIN/admin-panel';
import { ICategory, IUnitEvents } from '../../../../../../dashboard/models/EVJ/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';
import { fillDataShape } from '@shared/functions/common-functions';

interface ICreateClaim extends IWidget {
    isHidden: boolean;
}

@Component({
    selector: 'evj-aws-create-claim',
    templateUrl: './aws-create-claim.component.html',
    styleUrls: ['./aws-create-claim.component.scss'],
})
export class AwsCreateClaimComponent implements OnInit {
    @Output() private createdClaim: EventEmitter<IGlobalClaim[]> = new EventEmitter<IGlobalClaim[]>();
    @Input() workerSpecialClaims: IGlobalClaim[] = [];

    // TODO new
    public allSpecialClaims: IGlobalClaim[] = [];
    public selectedSpecialClaims: IGlobalClaim[] = [];

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidget[] = [];
    public allUnits: IUnitEvents[] = [];
    public allEventsCategories: ICategory[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidget> = new SelectionModel<IWidget>(true);
    public selectUnit: SelectionModel<IUnitEvents> = new SelectionModel<IUnitEvents>(true);

    search: string = '';

    constructor(private adminService: AdminPanelService) {}

    ngOnInit(): void {
        this.allWidgets = this.adminService.allWidgets.filter((value) => !value.isHidden);
        this.allUnits = this.adminService.units;
        this.allEventsCategories = this.adminService.eventsCategories;

        this.allSpecialClaims = this.adminService.specialClaims.filter((x) => x.claimValueType !== 'screen');
        this.selectedSpecialClaims = [...this.workerSpecialClaims];
    }

    // Проверка "Выбрать все"
    public checkIsAllSelected(): boolean {
        const currentClaim = this.selectClaim.selected[0];
        const checkerFunction = (list) => {
            for (const x of list) {
                if (!this.checkClaim(currentClaim, x)) {
                    return false;
                }
            }
            return true;
        };
        switch (currentClaim.claimValueType) {
            case 'widget':
                return checkerFunction(this.allWidgets);
            case 'unit':
                return checkerFunction(this.allUnits);
            case 'notificationCategory':
                return checkerFunction(this.allEventsCategories);
        }
        return false;
    }

    // Выбрать все
    public onClickListButton(): void {
        const isAllSelected = this.checkIsAllSelected();
        const currentClaim = this.selectClaim.selected[0];
        const selectFunction = (list, isUnselect) => {
            list.forEach((x) => {
                this.chooseClaim(currentClaim, x, isUnselect);
            });
        };
        switch (currentClaim.claimValueType) {
            case 'widget':
                selectFunction(this.allWidgets, isAllSelected);
                break;
            case 'unit':
                selectFunction(this.allUnits, isAllSelected);
                break;
            case 'notificationCategory':
                selectFunction(this.allEventsCategories, isAllSelected);
                break;
        }
    }

    public chooseClaim(claim: IGlobalClaim, ref, isUnselect: boolean = true): void {
        let value = null;
        switch (claim.claimValueType) {
            case 'unit':
                value = ref.id.toString();
                break;
            case 'widget':
                value = ref.id;
                break;
            case 'notificationCategory':
                value = ref.name;
                break;
            default:
                return;
        }
        const chooseClaimIdx = this.selectedSpecialClaims.findIndex(
            (x) => x.value === value && x.claimType === claim.claimType
        );
        if (chooseClaimIdx !== -1 && isUnselect) {
            this.selectedSpecialClaims.splice(chooseClaimIdx, 1);
        } else if (chooseClaimIdx === -1) {
            this.selectedSpecialClaims.push({ ...claim, value });
        }
    }

    public checkClaim(claim: IGlobalClaim, ref): boolean {
        let value = null;
        switch (claim.claimValueType) {
            case 'unit':
                value = ref.id.toString();
                break;
            case 'widget':
                value = ref.id;
                break;
            case 'notificationCategory':
                value = ref.name;
                break;
            default:
                return false;
        }
        return !!this.selectedSpecialClaims.find((x) => x.value === value && x.claimType === claim.claimType);
    }

    // Отменить
    public onBack(): void {
        this.createdClaim.emit();
    }

    // Сохранить
    public onSave(): void {
        this.createdClaim.emit(this.selectedSpecialClaims);
    }
}
