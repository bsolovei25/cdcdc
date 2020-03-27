import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from '../../services/appConfigService';
import { IUnits } from '../models/admin-shift-schedule';

export enum EnumClaimWidgets {
    add = 'add',
    move = 'move',
    resize = 'resize',
    delete = 'delete',
}
export enum EnumClaimScreens {
    add = 'add',
    edit = 'edit',
    delete = 'delete',
}

export interface IClaimAll {
    data: {
        aimType: string;
        value: string;
        description: string;
        claimCategory: string;
        claimCategoryName: 'Разрешить' | 'Запретить';
        claimName: string;
        specification: string;
    }[];
}
@Injectable({
    providedIn: 'root',
})
export class ClaimService {
    public claimWidgets$: BehaviorSubject<EnumClaimWidgets[]> = new BehaviorSubject<
        EnumClaimWidgets[]
    >([]);
    public claimScreens$: BehaviorSubject<EnumClaimScreens[]> = new BehaviorSubject<
        EnumClaimScreens[]
    >([]);

    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.getCliam();
    }

    private getCliam(): void {
        this.claimWidgets$.next([
            EnumClaimWidgets.delete,
            EnumClaimWidgets.move,
            EnumClaimWidgets.resize,
            EnumClaimWidgets.add,
        ]);
        this.claimScreens$.next([
            EnumClaimScreens.add,
            EnumClaimScreens.edit,
            EnumClaimScreens.delete,
        ]);
    }

    async getClaimAll(): Promise<IClaimAll> {
        try {
            return this.http
                .get<IClaimAll>(this.restUrl + `/api/user-management/claim/all`)
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
}
