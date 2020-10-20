import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IWidget } from '../../../../../../dashboard/models/widget.model';
import { IGlobalClaim } from '../../../../../../dashboard/models/ADMIN/admin-panel';
import { IUnitEvents } from '../../../../../../dashboard/models/EVJ/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../../../dashboard/services/admin-panel/admin-panel.service';
import { fillDataShape } from '@shared/functions/common-functions';

interface ICreateClaim extends IWidget {
    isHidden: boolean;
}

@Component({
    selector: 'evj-aws-create-claim',
    templateUrl: './aws-create-claim.component.html',
    styleUrls: ['./aws-create-claim.component.scss']
})
export class AwsCreateClaimComponent implements OnInit {

    @Output() private createdClaim: EventEmitter<IGlobalClaim[]>
        = new EventEmitter<IGlobalClaim[]>();
    @Input() workerSpecialClaims: IGlobalClaim[] = [];

    public allClaims: IGlobalClaim[] = [];
    public allWidgets: IWidget[] = [];
    public allUnits: IUnitEvents[] = [];

    public selectClaim: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();
    public selectWidget: SelectionModel<IWidget> = new SelectionModel<IWidget>(true);
    public selectUnit: SelectionModel<IUnitEvents> = new SelectionModel<IUnitEvents>(true);

    search: string = '';
    public selectCounter: boolean;

    constructor(private adminService: AdminPanelService) {
    }

    ngOnInit(): void {
        this.allClaims = this.adminService.specialClaims;
        this.allWidgets = this.adminService.allWidgets.filter((value) => !value.isHidden);
        this.allUnits = this.adminService.units;
        this.allClaims.forEach((value) => {
            if (value.claimValueType === 'widget') {
                const copyWidgets: IWidget[] = this.allWidgets.map(v => fillDataShape(v));
                this.workerSpecialClaims.forEach(workerClaim => {
                    if (workerClaim.claimType === value.claimType && workerClaim.claimValueType === 'widget') {
                        copyWidgets.forEach(valueW => {
                            workerClaim.widgets.forEach(widget => {
                                if (valueW.id === widget.id) {
                                    valueW.isActive = true;
                                }
                            });
                        });
                    }
                });
                value.widgets = copyWidgets;
            } else {
                const copyUnits: IUnitEvents[] = this.allUnits.map(v => fillDataShape(v));
                this.workerSpecialClaims.forEach(workerClaim => {
                    if (workerClaim.claimType === value.claimType && workerClaim.claimValueType === 'unit') {
                        copyUnits.forEach(valueW => {
                            workerClaim.units.forEach(unit => {
                                if (valueW.id === unit.id) {
                                    valueW.isActive = true;
                                }
                            });
                        });
                    }
                });
                value.units = copyUnits;
            }
        });
    }

    public changeActiveWidget(widget: IWidget): void {
        widget.isActive = !widget.isActive;
    }

    // Клик на Виджет
    public changeActiveUnit(unit: IUnitEvents): void {
        unit.isActive = !unit.isActive;
    }

    // Клик на Юнит
    public claimsFilter(claim: IGlobalClaim): boolean {
        return !(claim.claimValueType === 'screen');
    }

    // start Выбрать все
    public checkIsAllSelected(): boolean {
        this.selectClaim.selected[0].widgets?.forEach(v => {
            if (v.isActive) {
                this.selectCounter = true;
            }
        });
        this.selectClaim.selected[0].units?.forEach(v => {
            if (v.isActive) {
                this.selectCounter = true;
            }
        });
        return this.selectCounter;
    }

    public onClickListButton(): void {
        const selectedClaim: IGlobalClaim = this.selectClaim.selected[0];
        if (selectedClaim.widgets?.find(v => v.isActive)
            || selectedClaim.units?.find(v => v.isActive)) {
            selectedClaim?.widgets?.forEach((value) => {
                value.isActive = false;
            });
            selectedClaim?.units?.forEach((value) => {
                value.isActive = false;
            });
            this.selectCounter = false;
        } else {
            selectedClaim?.widgets?.forEach((value) => {
                value.isActive = true;
            });
            selectedClaim?.units?.forEach((value) => {
                value.isActive = true;
            });
            this.selectCounter = true;
        }
    }

    // end Выбрать все

    public onBack(): void {
        this.createdClaim.emit();
    }

    // Сохранить
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
        claims.forEach((v) => {
            if (v.claimValueType === 'widget') {
                v.widgets?.forEach(w => {
                    if (w.isActive !== true) {
                        w.title = '';
                    }
                });
            }
            if (v.claimValueType === 'unit') {
                v.units?.forEach(u => {
                    if (u.isActive !== true) {
                        u.name = '';
                    }
                });
            }
        });
        this.createdClaim.emit(claims);
    }
}
