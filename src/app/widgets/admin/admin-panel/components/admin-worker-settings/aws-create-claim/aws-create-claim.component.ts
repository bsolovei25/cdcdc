import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWidget } from '../../../../../../dashboard/models/widget.model';
import { IGlobalClaim } from '../../../../../../dashboard/models/admin-panel';
import { IUnitEvents } from '../../../../../../dashboard/models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../../../dashboard/services/admin-panel/admin-panel.service';
import { fillDataShape } from '../../../../../../@shared/common-functions';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

interface ICreateClaim extends IWidget {
    isHidden: boolean;
}

@Component({
    selector: 'evj-aws-create-claim',
    templateUrl: './aws-create-claim.component.html',
    styleUrls: ['./aws-create-claim.component.scss']
})
export class AwsCreateClaimComponent implements OnInit {
    @Output() private createdClaim: EventEmitter<IGlobalClaim[]> = new EventEmitter<IGlobalClaim[]>();

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidget[] = [];
    public allUnits: IUnitEvents[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidget> = new SelectionModel<IWidget>(true);
    public selectUnit: SelectionModel<IUnitEvents> = new SelectionModel<IUnitEvents>(true);

    search: string = '';

    constructor(private adminService: AdminPanelService) {
    }

    ngOnInit(): void {
        this.allClaims = this.adminService.specialClaims;
        this.allWidgets = this.adminService.allWidgets.filter((value) => !value.isHidden);
        this.allUnits = this.adminService.units;
        this.allClaims.forEach((value) => {
            if (value.claimValueType === 'widget') {
                const copyWidgets: IWidget[] = this.allWidgets.map(v => fillDataShape(v));
                value.widgets = copyWidgets;
            } else {
                const copyUnits: IUnitEvents[] = this.allUnits.map(v => fillDataShape(v));
                value.units = copyUnits;
            }

        });
    }

    public changeActiveWidget(widget: IWidget): void {
        widget.isActive = !widget.isActive;
    }

    public changeActiveUnit(unit: IUnitEvents): void {
        unit.isActive = !unit.isActive;
    }

    public claimsFilter(claim: IGlobalClaim): boolean {
        return !(claim.claimValueType === 'screen');
    }

    // start Выбрать все===
    public checkIsAllSelected(): boolean {
        this.selectClaim?.selected[0]?.widgets?.filter((v) => v.isActive).length === this.allWidgets.length
        || this.selectClaim?.selected[0]?.units?.filter((v) => v.isActive).length === this.allUnits.length;
    }

    public onClickListButton(): void {
        const selectedClaim: IGlobalClaim = this.selectClaim.selected[0];
        selectedClaim?.widgets?.forEach((value) => value.isActive = !value.isActive);
        selectedClaim?.units?.forEach((value) => value.isActive = !value.isActive);
    }

    // end ===Выбрать все===

    public onBack(): void {
        this.createdClaim.emit(null);
    }

    public onSave(): void {
        const claims: IGlobalClaim[] = [];
        this.allClaims.forEach((value) => {
            if (value?.widgets?.filter((v) => v.isActive).length) {
                claims.push(value);
            }
            if (value?.units?.filter((v) => v.isActive).length) {
                claims.push(value);
            }
        });
        console.log(claims);
        this.createdClaim.emit(claims);
    }

    searchFn(value: KeyboardEvent): void {
        console.log(value);
    }

}
