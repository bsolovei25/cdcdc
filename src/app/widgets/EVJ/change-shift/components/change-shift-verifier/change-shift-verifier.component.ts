import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IChangeShiftMember, IChangeShiftRole } from '../../change-shift.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { ChangeShiftKeeperService } from '../../services/change-shift-keeper.service';
import { IUnitEvents, IUser } from '@dashboard/models/EVJ/events-widget';
import { ChangeShiftApiService } from '@widgets/EVJ/change-shift/services/change-shift-api.service';

type ChangeShiftVerifierResult = 'success' | 'error';

@Component({
    selector: 'evj-change-shift-verifier',
    templateUrl: './change-shift-verifier.component.html',
    styleUrls: ['./change-shift-verifier.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftVerifierComponent implements OnInit, OnDestroy {
    private set member(value: IChangeShiftMember) {
        this._member = value;
    }
    // tslint:disable-next-line:variable-name
    public _member: IChangeShiftMember = null;
    public roleControl: FormControl = new FormControl();
    public unitControl: FormControl = new FormControl();
    public memberControl: FormControl = new FormControl();
    public availableRoles$: Observable<IChangeShiftRole[]> = this.changeShiftKeeperService.shift$.pipe(
        map((shift) => shift?.members?.filter((m) => !m.user)?.map((m) => m.unitRole))
    );
    public result$: Observable<ChangeShiftVerifierResult> = this.changeShiftKeeperService.verifyAction$.pipe(
        map((x) => (x.isConfirmed ? 'success' : 'error'))
    );
    public resultMessage$: Observable<string> = this.changeShiftKeeperService.verifyAction$.pipe(
        filter((x) => !x.isConfirmed),
        map((x) => x.message)
    );
    public allMembers$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
    public units$: BehaviorSubject<IUnitEvents[]> = new BehaviorSubject<IUnitEvents[]>([]);
    public filteredMembers$: Observable<IUser[]> = combineLatest([
        this.allMembers$,
        this.unitControl.valueChanges.pipe(startWith(null)),
    ]).pipe(
        map(([members, unit]) => {
            if (!!unit) {
                return members.filter((x) => x.unitId === unit);
            } else {
                return members;
            }
        })
    );
    public isAdminApplyValidate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private subscription$: Subject<unknown> = new Subject<unknown>();

    public isAdminClaim: boolean = true;

    constructor(
        private changeShiftKeeperService: ChangeShiftKeeperService,
        private changeShiftApiService: ChangeShiftApiService,
        private dialogRef: MatDialogRef<ChangeShiftVerifierComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { member: IChangeShiftMember; isAdmin: boolean }
    ) {}

    ngOnInit(): void {
        this.member = this.data.member;
        this.isAdminClaim = this.data.isAdmin;
        this.roleControl.setValue(this._member?.unitRole?.id);
        if (this.isAdminClaim) {
            this.memberControl.valueChanges
                .pipe(takeUntil(this.subscription$))
                .subscribe((x) => this.isAdminApplyValidate$.next(!!x));
            this.getAdminStates().then();
        } else {
            this.roleControl.valueChanges.pipe(takeUntil(this.subscription$)).subscribe((x) => {
                this.changeShiftKeeperService.switchVerifyRole(x).then();
            });
        }
    }

    ngOnDestroy(): void {
        this.subscription$.next();
        this.subscription$.complete();
    }

    public close(): void {
        this.dialogRef.close();
    }

    private async getAdminStates(): Promise<void> {
        await Promise.all([
            this.changeShiftApiService.getAllUsers().then((x) => this.allMembers$.next(x)),
            this.changeShiftApiService.getAllUnits().then((x) => this.units$.next(x)),
        ]);
    }

    public async adminApply(): Promise<void> {
        const memberId: number = this.memberControl.value;
        const roleId: number = this.roleControl.value;
        await this.changeShiftKeeperService.addUserToRoleConfirmed(memberId, roleId);
        this.close();
    }
}
