import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IGlobalClaim } from '../../../../models/admin-panel';
import { IWidget } from '../../../../models/widget.model';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { SelectionModel } from '@angular/cdk/collections';
import { fillDataShape } from '../../../../../@shared/common-functions';
import { IUnitEvents } from '../../../../models/events-widget';

@Component({
    selector: 'evj-aws-create-claim',
    templateUrl: './aws-create-claim.component.html',
    styleUrls: ['./aws-create-claim.component.scss'],
})
export class AwsCreateClaimComponent implements OnInit {
    @Output() private createdClaim: EventEmitter<IGlobalClaim[]> = new EventEmitter<
        IGlobalClaim[]
    >();

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidget[] = [];
    public allUnits: IUnitEvents[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidget> = new SelectionModel<IWidget>(true);
    public selectUnit: SelectionModel<IUnitEvents> = new SelectionModel<IUnitEvents>(true);

    constructor(private adminService: AdminPanelService) {}

    ngOnInit(): void {
        this.allClaims = this.adminService.specialClaims;
        this.allWidgets = this.adminService.allWidgets;
        this.allUnits = this.adminService.units;
    }

    public claimsFilter(claim: IGlobalClaim): boolean {
        return !(claim.claimValueType === 'screen');
    }

    public itemsFilter(): boolean {
        if (this.selectClaim.hasValue()) {
            return this.selectClaim.selected[0].claimValueType === 'widget';
        }
        return true;
    }

    public formEntitiesList(): IWidget[] {
        const additionalType = this.selectClaim?.selected[0]?.additionalType;
        if (additionalType) {
            return this.allWidgets.filter((widget) => widget.widgetType === additionalType);
        }
        return this.allWidgets;
    }

    public checkIsAllSelected(): boolean {
        if (this.itemsFilter()) {
            return this.selectWidget.selected.length === this.formEntitiesList().length;
        } else {
            return this.selectUnit.selected.length === this.allUnits.length;
        }
    }

    public onClickListButton(): void {
        const isAllSelected: boolean = this.checkIsAllSelected();

        if (this.itemsFilter()) {
            if (isAllSelected) {
                this.selectWidget.clear();
            } else {
                this.formEntitiesList().forEach((item) => this.selectWidget.select(item));
            }
        } else {
            if (isAllSelected) {
                this.selectUnit.clear();
            } else {
                this.allUnits.forEach((item) => this.selectUnit.select(item));
            }
        }
    }

    public onBack(): void {
        this.createdClaim.emit(null);
    }

    public onSave(): void {
        const selectedClaim: IGlobalClaim = this.selectClaim.selected[0];
        if (this.selectClaim.hasValue() && this.selectWidget.hasValue()) {
            const selectedWidgets: IWidget[] = this.selectWidget.selected;
            const claims: IGlobalClaim[] = [];

            selectedWidgets.forEach((widget) => {
                const claim: IGlobalClaim = fillDataShape(selectedClaim);
                claim.value = widget.id;
                claims.push(claim);
            });

            this.createdClaim.emit(claims);
        }

        if (this.selectClaim.hasValue() && this.selectUnit.hasValue()) {
            const selectedUnits: IUnitEvents[] = this.selectUnit.selected;
            const claims: IGlobalClaim[] = [];

            selectedUnits.forEach((unit) => {
                const claim: IGlobalClaim = fillDataShape(selectedClaim);
                claim.value = unit.id.toString();
                claims.push(claim);
            });

            this.createdClaim.emit(claims);
        }
    }
}
