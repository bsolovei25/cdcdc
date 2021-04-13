import { Injectable } from '@angular/core';
import {
    ChangeShiftMemberAction,
    ChangeShiftType,
    IChangeShiftCommentRequired,
    IChangeShiftMember,
    IChangeShiftModel,
    IChangeShiftVerifier,
} from '../change-shift.interfaces';
import { ChangeShiftApiService } from './change-shift-api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangeShiftVerifierComponent } from '../components/change-shift-verifier/change-shift-verifier.component';
import { takeUntil } from 'rxjs/operators';
import { ChangeShiftRolesComponent } from '../components/change-shift-roles/change-shift-roles.component';
import { SnackBarService } from '../../../../dashboard/services/snack-bar.service';

@Injectable()
export class ChangeShiftKeeperService {
    public widgetId: string = null;

    public shift$: BehaviorSubject<IChangeShiftModel> = new BehaviorSubject<IChangeShiftModel>(null);
    public requiredComment$: Subject<IChangeShiftCommentRequired> = new Subject<IChangeShiftCommentRequired>();
    public isRequireComment$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public verifyAction$: Subject<IChangeShiftVerifier> = new Subject<IChangeShiftVerifier>();

    public verifyRequest: IChangeShiftVerifier = null;

    private get shiftId(): number {
        return this.shift$?.getValue()?.id;
    }

    private get unitId(): number {
        return this.shift$?.getValue()?.unit?.id;
    }

    constructor(
        private changeShiftApi: ChangeShiftApiService,
        private dialog: MatDialog,
        private materialController: SnackBarService
    ) {}

    public async getUnitId(widgetId: string): Promise<number> {
        return await this.changeShiftApi.getUnitIdByWidget(widgetId);
    }

    public async switchVerifyRole(roleId: number): Promise<void> {
        await this.changeShiftApi.deleteVerifyRequest(this.verifyRequest?.id);
        this.verifyRequest = await this.changeShiftApi.addUserToRole(this.shiftId, roleId, this.widgetId);
    }

    public async memberAction(member: IChangeShiftMember, action: ChangeShiftMemberAction): Promise<void> {
        let reqAction: () => Promise<IChangeShiftVerifier> = null;
        const roleId: number = member?.unitRole?.id;
        const memberId: number = member?.id;

        switch (action) {
            case 'main':
                const shift = await this.changeShiftApi.setResponsible(memberId, this.shiftId);
                this.shift$.next(shift);
                return;
            case 'add':
                reqAction = () => this.changeShiftApi.addUserToRole(this.shiftId, roleId, this.widgetId);
                break;
            case 'progress':
                reqAction = () => this.changeShiftApi.progressMember(this.shiftId, memberId, this.widgetId);
                break;
            case 'delete':
                reqAction = () => this.changeShiftApi.deleteMember(this.shiftId, memberId, this.widgetId);
                break;
        }
        if (!reqAction) {
            return;
        }
        await this.verifyAction(reqAction, member);
    }

    public async applyShift(widgetId: string, comment: string, type: 'accept' | 'pass'): Promise<void> {
        const action = this.changeShiftApi.applyShift(this.shiftId, widgetId, type, comment);
        await this.verifyAction(() => action);
    }

    private async verifyAction(
        action: () => Promise<IChangeShiftVerifier>,
        member: IChangeShiftMember = null
    ): Promise<void> {
        this.verifyRequest = await action();
        if (!this.verifyRequest?.id) {
            return;
        }
        const res = await this.openVerifyDialog(member);
        if (!res) {
            this.changeShiftApi.deleteVerifyRequest(this.verifyRequest?.id).then();
            return;
        }
        this.loadShiftById(this.shiftId).then();
    }

    private openVerifyDialog(member: IChangeShiftMember = null): Promise<boolean> {
        const closeTimeSuccessMs: number = 1000;
        const closeTimeErrorMs: number = 10 * 1000;
        const completeSubscription = (subscription: Subject<unknown>) => {
            if (subscription.isStopped) {
                return;
            }
            subscription.next(null);
            subscription.complete();
        };
        return new Promise<boolean>((resolve) => {
            let result = true;
            const dialogRef = this.dialog.open(ChangeShiftVerifierComponent, { data: member });
            const subscription$: Subject<unknown> = new Subject<unknown>();
            dialogRef.backdropClick().subscribe(() => (result = false));
            dialogRef.afterClosed().subscribe(() => {
                completeSubscription(subscription$);
                resolve(result);
            });
            this.verifyAction$.pipe(takeUntil(subscription$)).subscribe((x) => {
                result = x.isConfirmed;
                setTimeout(() => dialogRef.close(), x.isConfirmed ? closeTimeSuccessMs : closeTimeErrorMs);
            });
        });
    }

    public openRolesControl(): void {
        if (!this.shiftId) {
            this.materialController.openSnackBar('Отсутствует смена');
            return;
        }
        const dialogRef = this.dialog.open(ChangeShiftRolesComponent, {
            data: { shiftId: this.shiftId, unitId: this.unitId },
        });
        dialogRef.afterClosed().subscribe(() => this.loadShiftById(this.shiftId).then());
    }

    public async loadShift(unitId: number, type: ChangeShiftType): Promise<void> {
        const shift = await this.changeShiftApi.getShiftByUnit(type, unitId);
        this.shift$.next(shift);
    }

    public async loadShiftById(shiftId: number): Promise<void> {
        if (!shiftId) {
            return;
        }
        const shift = await this.changeShiftApi.getShiftById(shiftId);
        if (this.shiftId !== shift?.id) {
            return;
        }
        this.shift$.next(shift);
    }

    public setIsCommentRequired(isRequired: boolean): void {
        this.isRequireComment$.next(isRequired);
    }

    public setRequiredComment(comment: string, isCancel: boolean = false): void {
        this.requiredComment$.next({ comment, result: !isCancel });
    }

    public async addShiftComment(comment: string): Promise<void> {
        const shiftId = this.shift$.getValue()?.id;
        if (!shiftId) {
            return;
        }
        const postComment = await this.changeShiftApi.sendComment(comment, shiftId);
        if (!postComment) {
            return;
        }
        this.shift$.next({ ...this.shift$.value, comments: [...(this.shift$.value.comments ?? []), postComment] });
    }
}
