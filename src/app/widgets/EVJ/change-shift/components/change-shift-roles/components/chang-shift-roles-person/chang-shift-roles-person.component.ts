import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ChangeShiftRolesService } from '../../services/change-shift-roles.service';
import { FormGroup } from '@angular/forms';
import { IChangeShiftMember, IChangeShiftRole } from '../../../../change-shift.interfaces';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ChangeShiftHelperService } from '../../../../services/change-shift-helper.service';

@Component({
    selector: 'evj-chang-shift-roles-person',
    templateUrl: './chang-shift-roles-person.component.html',
    styleUrls: ['./chang-shift-roles-person.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangShiftRolesPersonComponent implements OnInit, OnDestroy {
    @Input() private set form(value: FormGroup) {
        this.formGroup = value;
        this.member = value.controls.object.value;
        this.member.user.displayName = `${this.member.user.lastName ?? ''} ${this.member.user.firstName ?? ''} ${
            this.member.user.middleName ?? ''
        }`;
    }
    public formGroup: FormGroup = null;
    public member: IChangeShiftMember = null;

    public availableRoles$: BehaviorSubject<IChangeShiftRole[]> = new BehaviorSubject<IChangeShiftRole[]>([]);
    private unsubscribe$: Subject<unknown> = new Subject<unknown>();

    constructor(
        private changeShiftRolesService: ChangeShiftRolesService,
        private changeShiftHelperService: ChangeShiftHelperService
    ) {}

    ngOnInit(): void {
        const initRoles = this.changeShiftRolesService.form.controls.roles.value;
        const initMembers = this.changeShiftRolesService.form.controls.members.value?.map((x) => x.userRole) ?? [];
        this.setRoles(initRoles, initMembers);
        combineLatest([
            this.changeShiftRolesService.referenceRoles$.pipe(startWith(initRoles)),
            this.changeShiftRolesService.members$
                .pipe(map((x) => x?.map((m) => m.userRole) ?? []))
                .pipe(startWith(initMembers)),
        ])
            .pipe(takeUntil(this.unsubscribe$))
            .pipe(
                map((x) => ({
                    roles: x[0],
                    membersRoles: x[1],
                }))
            )
            .subscribe((x) => this.setRoles(x.roles, x.membersRoles));
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

    private setRoles(roles: IChangeShiftRole[], membersRoles: (number | string)[]): void {
        membersRoles = membersRoles.filter((x) =>
            this.changeShiftHelperService.isBaseRole(roles.find((r) => r.id === x)?.type)
        );
        const currentRole = this.formGroup.get('userRole').value;
        if (!roles.some((x) => x.id === currentRole) && !!currentRole) {
            this.formGroup.get('userRole').setValue(undefined);
            return;
        }
        const selectedRoles = membersRoles.filter((x) => x !== currentRole);
        roles = roles.filter((x) => selectedRoles.findIndex((r) => r === x.id) === -1);
        this.availableRoles$.next(roles);
    }
}
