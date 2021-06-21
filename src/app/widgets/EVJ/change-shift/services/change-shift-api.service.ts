import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ChangeShiftType,
    IChangeShiftComment,
    IChangeShiftModel,
    IChangeShiftDto,
    IChangeShiftRole,
    IChangeShiftVerifier,
} from '../change-shift.interfaces';
import { AppConfigService } from '@core/service/app-config.service';
import { IUnitEvents, IUser } from '@dashboard/models/EVJ/events-widget';

@Injectable({
    providedIn: 'root',
})
export class ChangeShiftApiService {
    private readonly restUrl: string;
    private readonly restUrlPrefix: string;
    private readonly controllerUrl: string = 'reception-pass';

    constructor(private http: HttpClient, appConfigService: AppConfigService) {
        this.restUrlPrefix = appConfigService.restUrl;
        this.restUrl = `${appConfigService.restUrl}/api/${this.controllerUrl}`;
    }

    public async getUnitIdByWidget(widgetId: string): Promise<number> {
        return this.http.get<number>(`${this.restUrl}/widget/${widgetId}/unitId`).toPromise();
    }

    public async applyShift(
        shiftId: number,
        widgetId: string,
        type: 'accept' | 'pass',
        comment: string
    ): Promise<IChangeShiftVerifier> {
        const body = {
            comment,
        };
        return await this.http
            .post<IChangeShiftVerifier>(`${this.restUrl}/ShiftConfirm/${shiftId}/widgetId/${widgetId}/${type}`, body)
            .toPromise();
    }

    public async applyShiftConfirmed(
        shiftId: number,
        type: 'accept' | 'pass',
        comment: string
    ): Promise<IChangeShiftModel> {
        const body = { comment };
        return await this.http.put<IChangeShiftModel>(`${this.restUrl}/Shift/${shiftId}/${type}`, body).toPromise();
    }

    public async getShiftById(shiftId: number): Promise<IChangeShiftModel> {
        try {
            return await this.http.get<IChangeShiftModel>(`${this.restUrl}/shift/${shiftId}`).toPromise();
        } catch (e) {
            return null;
        }
    }

    public async getShiftByUnit(shiftType: ChangeShiftType, unitId: number): Promise<IChangeShiftModel> {
        return await this.http
            .get<IChangeShiftModel>(`${this.restUrl}/shift/current-${shiftType}/unit/${unitId}`)
            .toPromise();
    }

    public async getRoles(unitId: number): Promise<IChangeShiftRole[]> {
        return await this.http.get<IChangeShiftRole[]>(`${this.restUrl}/unit-role/unit/${unitId}`).toPromise();
    }

    public async saveShiftControls(unitId: number, shiftId: number, body: unknown): Promise<void> {
        await this.http.put(`${this.restUrl}/unit-role/unit/${unitId}/shift/${shiftId}`, body).toPromise();
    }

    public async sendComment(comment: string, shiftId: number): Promise<IChangeShiftComment> {
        const body = { entityId: shiftId, comment };
        try {
            return await this.http
                .post<IChangeShiftComment>(`${this.restUrl}/shift/${shiftId}/comment`, body)
                .toPromise();
        } catch (e) {
            console.error('sendComment', e);
            return null;
        }
    }

    public async deleteVerifyRequest(requestId: number): Promise<IChangeShiftVerifier> {
        return await this.http
            .delete<IChangeShiftVerifier>(`${this.restUrl}/ShiftMemberConfirm/delete/${requestId}`)
            .toPromise();
    }

    public async setResponsible(memberId: number, shiftId: number): Promise<IChangeShiftModel> {
        return await this.http
            .post<IChangeShiftModel>(`${this.restUrl}/ShiftMember/${memberId}/shift/${shiftId}/setresponsible`, {})
            .toPromise();
    }

    public async addUserToRole(
        shiftId: number,
        roleId: number,
        widgetId: string,
        message: string = null
    ): Promise<IChangeShiftVerifier> {
        const body = { message };
        return await this.http
            .post<IChangeShiftVerifier>(
                `${this.restUrl}/ShiftMemberConfirm/shift/${shiftId}/accepted-role/${roleId}/widgetId/${widgetId}`,
                body
            )
            .toPromise();
    }

    public async addUserToRoleConfirmed(shiftId: number, roleId: number, userId: number): Promise<IChangeShiftModel> {
        const body = {};
        return await this.http
            .put<IChangeShiftModel>(`${this.restUrl}/ShiftMember/shift/${shiftId}/role/${roleId}/user/${userId}`, body)
            .toPromise();
    }

    public async progressMember(
        shiftId: number,
        memberId: number,
        widgetId: string,
        message: string = null
    ): Promise<IChangeShiftVerifier> {
        const body = { message };
        return await this.http
            .post<IChangeShiftVerifier>(
                `${this.restUrl}/ShiftMemberConfirm/shift/${shiftId}/passed-member/${memberId}/widgetId/${widgetId}`,
                body
            )
            .toPromise();
    }

    public async progressMemberConfirmed(shiftId: number, memberId: number): Promise<IChangeShiftModel> {
        const body = {};
        return await this.http
            .put<IChangeShiftModel>(`${this.restUrl}/ShiftMember/shift/${shiftId}/passed-member/${memberId}`, body)
            .toPromise();
    }

    public async deleteMember(shiftId: number, memberId: number, message: string = null): Promise<IChangeShiftModel> {
        const body = { message };
        return await this.http
            .put<IChangeShiftModel>(`${this.restUrl}/ShiftMember/shift/${shiftId}/to-absent-member/${memberId}`, body)
            .toPromise();
    }

    public async getAllUsers(): Promise<IUser[]> {
        try {
            return await this.http.get<IUser[]>(`${this.restUrlPrefix}/api/user-management/users`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getAllUnits(): Promise<IUnitEvents[]> {
        try {
            return this.http.get<IUnitEvents[]>(`${this.restUrlPrefix}/api/notification-reference/units`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getShiftsByDate(dateTime: Date, unitId: number): Promise<IChangeShiftDto[]> {
        const startDatetime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
        const endDatetime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 23, 59);
        return await this.getShiftsByPeriod(startDatetime, endDatetime, unitId);
    }

    public async getShiftsByPeriod(startTime: Date, endTime: Date, unitId: number): Promise<IChangeShiftDto[]> {
        try {
            return (
                await this.http
                    .get<{ data: IChangeShiftDto[] }>(
                        `${
                            this.restUrl
                        }/Shift/unit/${unitId}/shifts?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
                    )
                    .toPromise()
            )?.data;
        } catch (error) {
            console.error(error);
        }
    }
}
