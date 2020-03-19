import { Injectable } from '@angular/core';
import {
    ICommentRequired,
    IVerifyWindow,
    ShiftPass,
    VerifyWindowActions,
    VerifyWindowType,
} from '../models/shift.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUser } from '../models/events-widget';

@Injectable({
    providedIn: 'root',
})
export class ShiftService {
    public shiftPass$: BehaviorSubject<ShiftPass> = new BehaviorSubject<ShiftPass>(null);
    public continueWithComment: Subject<ICommentRequired> = new Subject<ICommentRequired>();
    public verifyWindowSubject: Subject<IVerifyWindow> = new Subject<IVerifyWindow>();
    public isCommentRequiredPass: boolean = false;
    public isCommentRequiredAccept: boolean = false;

    private restUrl: string;
    private shiftFreeStatus: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.shiftFreeStatus = configService.shiftFree;
    }

    public getShiftByUnit(unitId: number): Observable<ShiftPass> {
        return this.shiftPass$.pipe(filter((ref) => ref?.unitId === unitId));
    }

    public checkShiftByUnit(unitId: number): boolean {
        return this.shiftPass$.getValue()?.unitId === unitId;
    }

    public async getUnitId(widgetId: string): Promise<number> {
        return this.http
            .get<number>(`${this.restUrl}/api/shift/widget/unitId/${widgetId}`)
            .toPromise();
    }

    private async getShiftPassAsync(unitId: number): Promise<any> {
        return this.http.get(`${this.restUrl}/api/shift/unit/${unitId}`).toPromise();
    }

    private async getFreeMembersAsync(idShift: number): Promise<any> {
        switch (this.shiftFreeStatus) {
            case 'all':
                console.log('all');
                return this.http
                    .get(`${this.restUrl}/api/shift/users/free-users/${idShift}`)
                    .toPromise();
                break;
            default:
                console.log('not all');
                return this.http
                    .get(`${this.restUrl}/api/shift/users/free-brigade/${idShift}`)
                    .toPromise();
                break;
        }
    }

    private async changePositionAsync(id, idShift): Promise<any> {
        return this.http
            .post(
                this.restUrl +
                '/api/shift/' +
                idShift +
                '/employee/' +
                id.toString() +
                '/setresponsible',
                null
            )
            .toPromise();
    }

    private async changeStatusAsync(
        status,
        id,
        idShift,
        widgetId: string,
        msg: string
    ): Promise<any> {
        const body = {
            comment: msg,
        };
        return this.http
            .post(
                this.restUrl +
                '/api/shift/' +
                idShift +
                '/Employee/' +
                id +
                '/WidgetId/' +
                widgetId +
                '/ChangeStatus/' +
                status,
                body
            )
            .toPromise();
    }

    private async addMemberAsync(id, idShift): Promise<any> {
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/Employee/' + id, null)
            .toPromise();
    }

    private async delMemberAsync(id, idShift): Promise<any> {
        return this.http
            .delete(this.restUrl + '/api/shift/' + idShift + '/Employee/' + id)
            .toPromise();
    }

    private async applyShiftAsync(idShift: number, type: string, widgetId: string): Promise<any> {
        return this.http
            .post(`${this.restUrl}/api/shift/${idShift}/widgetid/${widgetId}/${type}`, null)
            .toPromise();
    }

    private async cancelShiftAsync(
        idShift: number,
        _comment: string,
        widgetId: string
    ): Promise<any> {
        const body = {
            comment: _comment,
        };
        return this.http
            .post(`${this.restUrl}/api/shift/${idShift}/widgetid/${widgetId}/accept-revert`, body)
            .toPromise();
    }

    private async passingComment(idShift: number, idUser: number, _comment: string): Promise<any> {
        const body = {
            userId: idUser,
            comment: _comment,
        };
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/passingcomment', body)
            .toPromise();
    }

    private async acceptingComment(
        idShift: number,
        idUser: number,
        _comment: string
    ): Promise<any> {
        const body = {
            userId: idUser,
            comment: _comment,
        };
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/acceptingcomment', body)
            .toPromise();
    }

    public async getShiftInfo(unitId: number): Promise<void> {
        const tempData = await this.getShiftPassAsync(unitId);
        tempData.unitId = 22;
        this.shiftPass$.next(tempData);
    }

    public async getFreeShiftMembers(id: number) {
        console.log('get free shift members with id: ' + id.toString());
        return await this.getFreeMembersAsync(id);
    }

    public async applyShift(
        idShift: number,
        type: string,
        widgetId: string,
        unitId: number
    ): Promise<void> {
        const obj = await this.applyShiftAsync(idShift, type, widgetId);
        console.log(obj);
        this.getShiftInfo(unitId);
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', 'usb', widgetId, null, null, obj.confirmId);
        }
    }

    public async cancelShift(
        idShift: number,
        comment: string,
        widgetId: string,
        unitId: number
    ): Promise<void> {
        const obj = await this.cancelShiftAsync(idShift, comment, widgetId);
        this.getShiftInfo(unitId);
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', 'usb', widgetId, null, null, obj.confirmId);
        }
    }

    public async changePosition(id, idShift, unitId: number): Promise<void> {
        await this.changePositionAsync(id, idShift);
        this.getShiftInfo(unitId);
    }

    public async changeStatus(
        status,
        id,
        idShift,
        widgetId: string,
        unitId: number,
        msg: string = null
    ): Promise<void> {
        const obj = await this.changeStatusAsync(status, id, idShift, widgetId, msg);
        this.getShiftInfo(unitId);
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', 'card', widgetId, null, null, obj.confirmId, obj.user);
        }
    }

    public async addMember(id, idShift, unitId: number): Promise<void> {
        await this.addMemberAsync(id, idShift);
        this.getShiftInfo(unitId);
    }

    public async delMember(id, idShift: number, unitId: number): Promise<void> {
        await this.delMemberAsync(id, idShift);
        this.getShiftInfo(unitId);
    }

    public async cancelUsbAction(verifyId: number): Promise<any> {
        return this.http
            .delete(`${this.restUrl}/api/shift/confirm-shift/delete/${verifyId}`)
            .toPromise();
    }

    public async cancelCardAction(verifyId: number): Promise<any> {
        return this.http
            .delete(`${this.restUrl}/api/shift/confirm-member/delete/${verifyId}`)
            .toPromise();
    }

    public async sendComment(idUser: number, idShift: number, comment: string, type: string) {
        let answer: any = null;
        if (type === 'shift-pass') {
            answer = await this.passingComment(idShift, idUser, comment);
        } else {
            answer = await this.acceptingComment(idShift, idUser, comment);
        }
        return answer;
    }

    public getRequiredComment(idShift: number): any {
        return this.continueWithComment.pipe(
            filter((ref) => ref && ref.idShift === idShift),
            map((ref) => {
                return ref;
            })
        );
    }

    public setIsCommentRequired(state: boolean, widgetType: string): void {
        console.log(widgetType, state);
        if (widgetType === 'shift-pass') {
            this.isCommentRequiredPass = state;
        } else {
            this.isCommentRequiredAccept = state;
        }
        console.log((this.isCommentRequiredAccept = state));
    }

    public getIsCommentRequired(widgetType: string): boolean {
        if (widgetType === 'shift-pass') {
            return this.isCommentRequiredPass;
        } else {
            return this.isCommentRequiredAccept;
        }
    }

    public actionVerifyWindow(
        _action: VerifyWindowActions,
        _type: VerifyWindowType,
        _widgetId: string,
        _message: string = null,
        _result: boolean = null,
        _verifyId: number = null,
        _user: IUser = null
    ): void {
        const obj: IVerifyWindow = {
            action: _action,
            type: _type,
            widgetId: _widgetId,
            message: _message,
            verifyId: _verifyId,
            user: _user,
            result: _result,
        };
        this.verifyWindowSubject.next(obj);
    }

    public resultVerify(widgetId: string, result: any, unitId: number): void {
        this.actionVerifyWindow('close', null, widgetId, result.isConfirm, result.message);
        this.getShiftInfo(unitId);
    }

    public verifyWindowObservable(widgetId: string): Observable<IVerifyWindow> {
        return this.verifyWindowSubject.pipe(filter((ref) => ref && ref.widgetId === widgetId));
    }
}
