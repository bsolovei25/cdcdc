import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChangeShiftRolesService } from '../../services/change-shift-roles.service';
import { ChangeShiftRoleType, IChangeShiftRole, IChangeShiftRoleReference } from '../../../../change-shift.interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeShiftHelperService } from '../../../../services/change-shift-helper.service';

@Component({
    selector: 'evj-change-shift-roles-reference',
    templateUrl: './change-shift-roles-reference.component.html',
    styleUrls: ['./change-shift-roles-reference.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftRolesReferenceComponent implements OnInit, OnDestroy {
    @Input() private set form(value: FormGroup) {
        this.formGroup = value;
        const object = value.value;
        this.isStar = this.isStarRole(object.type);
    }

    public formGroup: FormGroup = null;
    public isStar: boolean = false;
    public reference: IChangeShiftRoleReference[] = [];

    private subscribe$: Subject<null> = new Subject<null>();

    constructor(
        private changeShiftRolesService: ChangeShiftRolesService,
        private changeShiftHelperService: ChangeShiftHelperService
    ) {}

    ngOnInit(): void {
        this.reference = this.changeShiftRolesService.roleReference;
        this.formGroup.valueChanges
            .pipe(takeUntil(this.subscribe$))
            .subscribe((x) => (this.isStar = this.isStar = this.isStarRole(x.type)));
    }

    ngOnDestroy(): void {
        this.subscribe$.next(null);
        this.subscribe$.complete();
    }

    public delete(): void {
        this.changeShiftRolesService.deleteRole(this.formGroup);
    }

    private isStarRole(type: ChangeShiftRoleType): boolean {
        return this.changeShiftHelperService.isBaseRole(type);
    }
}
