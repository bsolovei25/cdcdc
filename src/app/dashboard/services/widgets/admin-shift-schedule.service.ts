import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import {
    IScheduleShiftDay,
    IScheduleShift,
    IBrigadeWithUsersDto,
    IUnits,
} from '../../models/admin-shift-schedule';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { BehaviorSubject } from 'rxjs';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { IAbsent } from '../../widgets/admin-widget/admin-shift-schedule/admin-shift-schedule.component';

export interface IDropItem {
    container: CdkDropList;
    currentIndex: number;
    distance: { x: number; y: number };
    isPointerOverContainer: boolean;
    item: CdkDrag;
    previousContainer: CdkDropList;
    previousIndex: number;
}

@Injectable({
    providedIn: 'root',
})
export class AdminShiftScheduleService {
    private readonly restUrl: string;

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<
        IAlertWindowModel
    >(null);

    moveItemBrigade$: BehaviorSubject<IDropItem> = new BehaviorSubject<IDropItem>(null);
    moveItemId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    updateBrigades$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    postAbsent$: BehaviorSubject<{ userId: number; absentReasonId: number }> = new BehaviorSubject<{
        userId: number;
        absentReasonId: number;
    }>(null);

    brigadeColor$: BehaviorSubject<{ color: string; id: number }[]> = new BehaviorSubject<
        { color: string; id: number }[]
    >(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getSchudeleShiftsMonth(
        unitId: number,
        month: number,
        year: number
    ): Promise<IScheduleShiftDay[]> {
        try {
            return this.http
                .get<IScheduleShiftDay[]>(
                    this.restUrl + `/api/schedule-shifts/unit/${unitId}/month/${month}/${year}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }
    async getSchudeleShift(id: number): Promise<IScheduleShift> {
        try {
            return this.http
                .get<IScheduleShift>(this.restUrl + `/api/schedule-shifts/shift/${id}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getBrigades(unitId: number): Promise<IBrigadeWithUsersDto[]> {
        try {
            return this.http
                .get<IBrigadeWithUsersDto[]>(
                    this.restUrl + `/api/user-management/brigades/unit/${unitId}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUnits(): Promise<IUnits[]> {
        try {
            return this.http
                .get<IUnits[]>(this.restUrl + `/api/user-management/units/all`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAbsentReasons(): Promise<IAbsent[]> {
        return this.http
            .get<IAbsent[]>(this.restUrl + `/api/schedule-shifts/absentreasons`)
            .toPromise();
    }

    async getSubstitution(unitId: number): Promise<IBrigadeWithUsersDto> {
        return this.http
            .get<IBrigadeWithUsersDto>(
                this.restUrl + `/api/user-management/users/substitution/unit/${unitId}`
            )
            .toPromise();
    }

    async postAbsent(shiftId: number, userId: number, absentReasonId: number): Promise<any> {
        return this.http
            .post(this.restUrl + '/api/schedule-shifts/member/absent', {
                shiftId,
                userId,
                absentReasonId,
            })
            .toPromise();
    }

    async postMemberRestore(shiftId: number, userId: number): Promise<any> {
        return this.http
            .post(this.restUrl + '/api/schedule-shifts/member/restore', {
                shiftId,
                userId,
            })
            .toPromise();
    }

    async postSelectBrigade(shiftId: number, brigadeId: number): Promise<any> {
        try {
            return this.http
                .post(this.restUrl + '/api/schedule-shifts/shift', { shiftId, brigadeId })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postMemberFromBrigade(shiftId: number, userId: number): Promise<any> {
        return this.http
            .post(this.restUrl + `/api/schedule-shifts/shift/${shiftId}/member`, {
                shiftId,
                userId,
            })
            .toPromise();
    }

    async postBrigade(unit: IUnits, number: string): Promise<any> {
        try {
            return this.http
                .post(this.restUrl + `/api/user-management/brigade`, { number, unit })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postUserBrigadeReset(userId: number): Promise<any> {
        try {
            return this.http
                .post(
                    this.restUrl + `/api/user-management/brigade/user/${userId}/brigade/reset`,
                    null
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putBrigadeEdit(id: number, number: string): Promise<any> {
        try {
            return this.http
                .put(this.restUrl + `/api/user-management/brigade/${id}`, {
                    id,
                    number,
                })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postUsertoBrigade(userId: number, brigadeId: string): Promise<any> {
        try {
            return this.http
                .post(
                    this.restUrl +
                        `/api/user-management/brigade/user/${userId}/brigade/${brigadeId}`,
                    null
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postUserResponsible(userId: number): Promise<any> {
        try {
            return this.http
                .post(this.restUrl + `/api/user-management/user/${userId}/SetResponsible`, null)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteBrigade(brigadeId: number): Promise<void> {
        return await this.http
            .delete<void>(this.restUrl + `/api/user-management/brigade/${brigadeId}`)
            .toPromise();
    }

    async deleteBrigadeFromShift(shiftId: number): Promise<void> {
        return await this.http
            .delete<void>(this.restUrl + `/api/schedule-shifts/shift/${shiftId}`)
            .toPromise();
    }

    async resetTodayBrigades(unitid: number): Promise<void> {
        return await this.http
            .get<void>(this.restUrl + `/api/shift/unit/${unitid}/set-default-state`)
            .toPromise();
    }

    async deleteMemberFromBrigade(idShift: number, idMember: number): Promise<void> {
        return await this.http
            .delete<void>(this.restUrl + `/api/schedule-shifts/shift/${idShift}/member/${idMember}`)
            .toPromise();
    }
}
