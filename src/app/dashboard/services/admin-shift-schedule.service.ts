import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { IScheduleShift, IBrigadeWithUsersDto, IScheduleShiftDay } from '../models/admin-shift-schedule';

@Injectable({
    providedIn: 'root',
})
export class AdminShiftScheduleService {
    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getSchudeleShiftsMonth(): Promise<IScheduleShiftDay[]> {
        try {
            return this.http
                .get<IScheduleShiftDay[]>(this.restUrl + '/api/schedule-shifts/month')
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

    async getBrigade(): Promise<IBrigadeWithUsersDto[]> {
        try {
            return this.http
                .get<IBrigadeWithUsersDto[]>(this.restUrl + `/api/user-management/brigades`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postSelectBrigade(body: { shiftId: number; brigadeId: number }): Promise<object> {
        try {
            return this.http.post(this.restUrl + '/api/schedule-shifts/shift', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postMemberFromBrigade(body: { shiftId: number; userId: number }): Promise<object> {
        try {
            return this.http
                .post(this.restUrl + '/api/schedule-shifts/shift/1033/member', body)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteBrigade(id: number): Promise<void> {
        try {
            return await this.http
                .delete<void>(this.restUrl + `/api/schedule-shifts/shift/${id}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteMemberFromBrigade(idShift: number, idMember: number): Promise<void> {
        try {
            return await this.http
                .delete<void>(
                    this.restUrl + `/api/schedule-shifts/shift/${idShift}/member/${idMember}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
