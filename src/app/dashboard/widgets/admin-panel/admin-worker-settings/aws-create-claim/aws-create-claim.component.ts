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
    @Output() private createdClaim: EventEmitter<IGlobalClaim> = new EventEmitter<IGlobalClaim>();

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidgets[] = [];
    public allUnits: IUnitEvents[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidgets> = new SelectionModel<IWidgets>();
    public selectUnit: SelectionModel<IUnitEvents> = new SelectionModel<IUnitEvents>();

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

    public onBack(): void {
        this.createdClaim.emit(null);
    }

    public onSave(): void {
        if (this.selectClaim.hasValue() && this.selectWidget.hasValue()) {
            const claim: IGlobalClaim = fillDataShape(this.selectClaim.selected[0]);
            claim.value = this.selectWidget.selected[0].id;
            this.createdClaim.emit(claim);
        }

        if (this.selectClaim.hasValue() && this.selectUnit.hasValue()) {
            const claim: IGlobalClaim = fillDataShape(this.selectClaim.selected[0]);
            claim.value = this.selectUnit.selected[0].id.toString();
            this.createdClaim.emit(claim);
        }
    }
}
