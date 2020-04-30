import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGlobalClaim } from '../../../../models/admin-panel';
import { IWidgets } from '../../../../models/widget.model';
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
    public allWidgets: IWidgets[] = [];
    public allUnits: IUnitEvents[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidgets> = new SelectionModel<IWidgets>(true);
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

    public formEntitiesList(): IWidgets[] {
        const additionalType = this.selectClaim?.selected[0]?.additionalType;
        if (additionalType) {
            return this.allWidgets.filter((widget) => widget.widgetType === additionalType);
        }
        return this.allWidgets;
    }

    public checkIsAllSelected(): boolean {
        return this.selectClaim.selected.length === this.formEntitiesList().length;
    }

    public onBack(): void {
        this.createdClaim.emit(null);
    }

    public onSave(): void {
        const selectedClaim: IGlobalClaim = this.selectClaim.selected[0];
        if (this.selectClaim.hasValue() && this.selectWidget.hasValue()) {
            const selectedWidgets: IWidgets[] = this.selectWidget.selected;
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
