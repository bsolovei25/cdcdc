import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGlobalClaim } from '../../../../models/admin-panel';
import { IWidgets } from '../../../../models/widget.model';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { SelectionModel } from '@angular/cdk/collections';
import { fillDataShape } from '../../../../../@shared/common-functions';

@Component({
    selector: 'evj-aws-create-claim',
    templateUrl: './aws-create-claim.component.html',
    styleUrls: ['./aws-create-claim.component.scss'],
})
export class AwsCreateClaimComponent implements OnInit {
    @Output() private createdClaim: EventEmitter<IGlobalClaim> = new EventEmitter<IGlobalClaim>();

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidgets[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidgets> = new SelectionModel<IWidgets>();

    constructor(private adminService: AdminPanelService) {}

    ngOnInit(): void {
        this.allClaims = this.adminService.specialClaims;
        this.allWidgets = this.adminService.allWidgets;
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
    }
}
