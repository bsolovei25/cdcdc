import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { BehaviorSubject } from 'rxjs';

export enum EnumClaimWidgets {
    add = 'add',
    delete = 'delete',
    resize = 'resize',
    move = 'move'
}
export enum EnumClaimScreens {
    add = 'add',
    delete = 'delete',
    edit = 'edit',
}

@Injectable({
    providedIn: 'root',
})
export class ClaimService {
    private readonly restUrl: string;

    public claimWidgets$: BehaviorSubject<EnumClaimWidgets[]> =
        new BehaviorSubject<EnumClaimWidgets[]>([]);
    public claimScreens$: BehaviorSubject<EnumClaimScreens[]> =
        new BehaviorSubject<EnumClaimScreens[]>([]);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.getCliam();
    }

    private getCliam(): void {
        this.claimWidgets$.next([EnumClaimWidgets.add, EnumClaimWidgets.delete,
        EnumClaimWidgets.move]);
        this.claimScreens$.next([EnumClaimScreens.add, EnumClaimScreens.delete]);
    }

}
