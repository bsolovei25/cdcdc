import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWidget } from '../../../../../../dashboard/models/widget.model';
import { IGlobalClaim } from '../../../../../../dashboard/models/admin-panel';
import { IUnitEvents } from '../../../../../../dashboard/models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../../../dashboard/services/admin-panel/admin-panel.service';
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
    @Output() private createdClaim: EventEmitter<IGlobalClaim[]> = new EventEmitter<
        IGlobalClaim[]
    >();

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidget[] = [];
    public allUnits: IUnitEvents[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidget> = new SelectionModel<IWidget>(true);
    public selectUnit: SelectionModel<IUnitEvents> = new SelectionModel<IUnitEvents>(true);

    search: string = '';

    constructor(private adminService: AdminPanelService) {}

    ngOnInit(): void {
        this.allClaims = this.adminService.specialClaims;
        this.allWidgets = this.adminService.allWidgets.filter((value) => !value.isHidden);
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

    filterAllWidgets(): IUnitEvents[] {
        return this.allUnits.filter((units) =>
            units.name
                ?.trim()
                .toLowerCase()
                .includes(this.search?.trim().toLowerCase())
        );
    }

    public formEntitiesList(): IWidget[] {
        const additionalType = this.selectClaim?.selected[0]?.additionalType;
        if (additionalType) {
            if (this.search) {
                return this.allWidgets.filter(
                    (widget) =>
                        widget.widgetType === additionalType &&
                        widget?.title
                            .trim()
                            .toLowerCase()
                            .includes(this.search?.trim().toLowerCase())
                );
            } else {
                return this.allWidgets.filter((widget) => widget.widgetType === additionalType);
            }
        }
        if (this.search) {
            return this.allWidgets.filter((widget) =>
                widget.title
                    ?.trim()
                    .toLowerCase()
                    .includes(this.search?.trim().toLowerCase())
            );
        } else {
            return this.allWidgets.filter((widget) => widget.title?.trim().toLowerCase());
        }
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

    searchFn(value: KeyboardEvent): void {
        console.log(value);
    }
}
