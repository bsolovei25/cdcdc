import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import {
    IScheduleShift,
    IBrigadeWithUsersDto,
    IScheduleShiftDay,
} from '../models/admin-shift-schedule';

@Injectable({
    providedIn: 'root',
})
export class AdminShiftScheduleService {
    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getSchudeleShiftsMonth(month: number, year: number): Promise<IScheduleShiftDay[]> {
        try {
            return this.http
                .get<IScheduleShiftDay[]>(
                    this.restUrl + `/api/schedule-shifts/month/${month}/${year}`
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

    async getBrigades(): Promise<IBrigadeWithUsersDto[]> {
        try {
            return this.http
                .get<IBrigadeWithUsersDto[]>(this.restUrl + `/api/user-management/brigades`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getBrigadesSubstitution(): Promise<IBrigadeWithUsersDto> {
        try {
            return this.http
                .get<IBrigadeWithUsersDto>(
                    this.restUrl + `/api/user-management/brigade/substitution`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
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
        try {
            return this.http
                .post(this.restUrl + `/api/schedule-shifts/shift/${shiftId}/member`, {
                    shiftId,
                    userId,
                })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteBrigade(shiftId: number): Promise<void> {
        try {
            return await this.http
                .delete<void>(this.restUrl + `/api/schedule-shifts/shift/${shiftId}`)
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
