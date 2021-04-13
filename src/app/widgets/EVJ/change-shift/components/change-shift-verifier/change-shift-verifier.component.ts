import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IChangeShiftMember, IChangeShiftRole } from '../../change-shift.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ChangeShiftKeeperService } from '../../services/change-shift-keeper.service';

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

    private subscription$: Subject<unknown> = new Subject<unknown>();

    constructor(
        private changeShiftKeeperService: ChangeShiftKeeperService,
        private dialogRef: MatDialogRef<ChangeShiftVerifierComponent>,
        @Inject(MAT_DIALOG_DATA) private data: IChangeShiftMember
    ) {}

    ngOnInit(): void {
        this.member = this.data;
        this.roleControl.setValue(this._member?.unitRole?.id);
        this.roleControl.valueChanges.pipe(takeUntil(this.subscription$)).subscribe((x) => {
            this.changeShiftKeeperService.switchVerifyRole(x).then();
        });
    }

    ngOnDestroy(): void {
        this.subscription$.next();
        this.subscription$.complete();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
