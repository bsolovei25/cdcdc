import { Injectable } from '@angular/core';
import {
    ICommentRequired,
    IVerifyWindow,
    ShiftPass,
    VerifyWindowActions, VerifyWindowType,
} from '../models/shift.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../models/events-widget';

@Injectable({
    providedIn: 'root',
})
export class ShiftService {
    public shiftPass: BehaviorSubject<ShiftPass> = new BehaviorSubject<ShiftPass>(null);
    public continueWithComment: Subject<ICommentRequired> = new Subject<ICommentRequired>();
    public verifyWindowSubject: Subject<IVerifyWindow> = new Subject<IVerifyWindow>();
    public isCommentRequiredPass: boolean = false;
    public isCommentRequiredAccept: boolean = false;

    private restUrl: string;
    private shiftFreeStatus: string;

    constructor(
        private http: HttpClient,
        configService: AppConfigService,
        private snackBar: MatSnackBar
    ) {
        this.restUrl = configService.restUrl;
        this.shiftFreeStatus = configService.shiftFree;
        this.getShiftInfo();
    }

    private async getShiftPassAsync(): Promise<any> {
        return this.http.get(this.restUrl + '/api/shift').toPromise();
    }

    private async getFreeMembersAsync(id: number): Promise<any> {
        const i: number = 0;
        switch (this.shiftFreeStatus) {
            case 'all':
                console.log('all');
                return this.http
                    .get(this.restUrl + '/api/shift/users/free/' + id.toString()).toPromise();
                break;
            default:
                console.log('not all');
                return this.http
                    .get(this.restUrl + '/api/shift/users/free/' + id.toString()).toPromise();
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

    private async cancelShiftAsync(idShift: number, _comment: string, widgetId: string): Promise<any> {
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

    private async acceptingComment(idShift: number, idUser: number, _comment: string): Promise<any> {
        const body = {
            userId: idUser,
            comment: _comment,
        };
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/acceptingcomment', body)
            .toPromise();
    }

    public async getShiftInfo() {
        const tempData = await this.getShiftPassAsync();
        this.shiftPass.next(tempData);
    }

    public async getFreeShiftMembers(id: number) {
        console.log('get free shift members with id: ' + id.toString());
        return await this.getFreeMembersAsync(id);
    }

    public async applyShift(idShift: number, type: string, widgetId: string): Promise<void> {
        const obj = await this.applyShiftAsync(idShift, type, widgetId);
        this.getShiftInfo();
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', 'usb', widgetId);
        }
    }

    public async cancelShift(idShift: number, comment: string, widgetId: string): Promise<void> {
        const obj = await this.cancelShiftAsync(idShift, comment, widgetId);
        this.getShiftInfo();
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', 'usb', widgetId);
        }
    }

    public async changePosition(id, idShift) {
        await this.changePositionAsync(id, idShift);
        this.getShiftInfo();
    }

    public async changeStatus(
        status,
        id,
        idShift,
        widgetId: string,
        msg: string = null
    ): Promise<void> {
        const obj = await this.changeStatusAsync(status, id, idShift, widgetId, msg);
        this.getShiftInfo();
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', 'card', widgetId, null, obj.confirmId, obj.user);
        }
    }

    public async addMember(id, idShift) {
        await this.addMemberAsync(id, idShift);
        this.getShiftInfo();
    }

    public async delMember(id, idShift) {
        await this.delMemberAsync(id, idShift);
        this.getShiftInfo();
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
        _result: boolean = null,
        _verifyId: number = null,
        _user: IUser = null
    ): void {
        const obj: IVerifyWindow = {
            action: _action,
            type: _type,
            widgetId: _widgetId,
            verifyId: _verifyId,
            user: _user,
            result: _result,
        };
        this.verifyWindowSubject.next(obj);
    }

    public resultVerify(widgetId: string, result: boolean): void {
        this.actionVerifyWindow('close', null, widgetId, result);
        this.getShiftInfo();
    }

    public verifyWindowObservable(widgetId: string): Observable<IVerifyWindow> {
        return this.verifyWindowSubject.pipe(filter((ref) => ref && ref.widgetId === widgetId));
    }
}
