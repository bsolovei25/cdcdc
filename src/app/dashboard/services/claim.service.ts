import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from '../../services/appConfigService';
import { IUnits } from '../models/admin-shift-schedule';
import { IClaim } from '../models/user-settings.model';

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
        this.getClaim();
    }

    public setClaimsByScreen(claims: IClaim[]): void {
        const claimsWidget: EnumClaimWidgets[] = [];
        claims.forEach((claim) => {
            switch (claim.claimType) {
                case 'screenWidgetAdd':
                case 'screensWidgetAdd':
                    claimsWidget.push(EnumClaimWidgets.add);
                    break;
                case 'screenWidgetDel':
                case 'screensWidgetDel':
                    claimsWidget.push(EnumClaimWidgets.delete);
                    break;
                case 'screenWidgetEdit':
                case 'screensWidgetEdit':
                    claimsWidget.push(EnumClaimWidgets.resize);
                    claimsWidget.push(EnumClaimWidgets.move);
                    break;
                case 'screenAdmin':
                    claimsWidget.push(EnumClaimWidgets.add);
                    claimsWidget.push(EnumClaimWidgets.delete);
                    claimsWidget.push(EnumClaimWidgets.move);
                    claimsWidget.push(EnumClaimWidgets.resize);
                    break;
            }
        });
        console.log(claimsWidget);
        this.claimWidgets$.next(claimsWidget);
    }

    private async getClaim(): Promise<void> {
        // this.claimWidgets$.next([
        //     // EnumClaimWidgets.delete, // TODO
        //     EnumClaimWidgets.move,
        //     EnumClaimWidgets.resize,
        //     EnumClaimWidgets.add,
        // ]);
        // this.claimScreens$.next([
        //     EnumClaimScreens.add,
        //     EnumClaimScreens.edit,
        //     EnumClaimScreens.delete,
        // ]);
        const allUserClaims = await this.getClaimAll();
        console.log(allUserClaims);
        const claimsScreen: EnumClaimScreens[] = [];
        let i: number = 0;
        allUserClaims.data.forEach((claim) => {
            switch (claim.claimType) {
                case 'screensAdmin':
                case 'screensAdd':
                    claimsScreen.push(EnumClaimScreens.add);
                    break;
            }
            i++;
        });
        console.log(claimsScreen);
        this.claimScreens$.next(claimsScreen);
    }

    async getClaimAll(): Promise<{ data: IClaim[] }> {
        try {
            return this.http
                .get<{ data: IClaim[] }>(this.restUrl + `/api/user-management/claim/all`)
                .toPromise();
        } catch (error) {
            return { data: [] };
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
