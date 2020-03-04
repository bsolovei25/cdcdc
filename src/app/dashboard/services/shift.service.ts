import { Injectable } from '@angular/core';
import {
    Employee,
    ICommentRequired,
    IVerifyWindow,
    ShiftMember,
    ShiftPass,
    VerifyWindowActions,
} from '../models/shift.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { IUser } from '../models/events-widget';

@Injectable({
    providedIn: 'root',
})
export class ShiftService {
    public shiftPass: BehaviorSubject<ShiftPass> = new BehaviorSubject<ShiftPass>(null);
    public continueWithComment: Subject<ICommentRequired> = new Subject<ICommentRequired>();
    public verifyWindowSubject: Subject<IVerifyWindow> = new Subject<IVerifyWindow>();
    public allMembers: Employee[] = [];
    public isCommentRequiredPass: boolean = false;
    public isCommentRequiredAccept: boolean = false;

    private restUrl: string;

    constructor(
        private http: HttpClient,
        configService: AppConfigService,
        private snackBar: MatSnackBar
    ) {
        this.restUrl = configService.restUrl;
        this.getShiftInfo();
    }

    private async getShiftPassAsync(): Promise<any> {
        return this.http.get(this.restUrl + '/api/shift').toPromise();
    }

    private async getFreeMembersAsync(id: number): Promise<any> {
        return this.http.get(this.restUrl + '/api/shift/users/free/' + id.toString()).toPromise();
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

    private async applyShiftAsync(idShift, type) {
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/' + type, null)
            .toPromise();
    }

    private async cancelShiftAsync(idShift: number, _comment: string) {
        const body = {
            comment: _comment,
        };
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/accept-revert', body)
            .toPromise();
    }

    private async passingComment(idShift, idUser, commentary): Promise<any> {
        const body = {
            userId: idUser,
            comment: commentary,
        };
        return this.http
            .post(this.restUrl + '/api/shift/' + idShift + '/passingcomment', body)
            .toPromise();
    }

    private async acceptingComment(idShift, idUser, commentary): Promise<any> {
        const body = {
            userId: idUser,
            comment: commentary,
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

    public async applyShift(idShift, type) {
        await this.applyShiftAsync(idShift, type);
        this.getShiftInfo();
    }

    public async cancelShift(idShift: number, comment: string): Promise<void> {
        await this.cancelShiftAsync(idShift, comment);
        this.getShiftInfo();
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
        console.log(obj);
        this.getShiftInfo();
        if (obj.actionType === 'confirmed') {
            this.actionVerifyWindow('open', widgetId, null, obj.confirmId, obj.user);
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
        _widgetId: string,
        _result: boolean,
        _verifyId: number = null,
        _user: IUser = null
    ): void {
        const obj: IVerifyWindow = {
            action: _action,
            widgetId: _widgetId,
            verifyId: _verifyId,
            user: _user,
            result: _result,
        };
        console.log(obj);
        this.verifyWindowSubject.next(obj);
    }

    public resultVerify(widgetId: string, result: boolean): void {
        console.log(widgetId);
        console.log(result);
        this.actionVerifyWindow('close', widgetId, result);
        this.getShiftInfo();
    }

    public verifyWindowObservable(widgetId: string): any {
        return this.verifyWindowSubject.pipe(filter((ref) => ref && ref.widgetId === widgetId));
    }
}
