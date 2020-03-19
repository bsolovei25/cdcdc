import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
@Injectable({
    providedIn: 'root',
})
export class ClaimService {
    public claimWidgets$: BehaviorSubject<EnumClaimWidgets[]> =
        new BehaviorSubject<EnumClaimWidgets[]>([]);
    public claimScreens$: BehaviorSubject<EnumClaimScreens[]> =
        new BehaviorSubject<EnumClaimScreens[]>([]);

    constructor(public http: HttpClient) {
        this.getCliam();
    }

    private getCliam(): void {
        this.claimWidgets$.next([
            EnumClaimWidgets.delete,
            EnumClaimWidgets.move,
            EnumClaimWidgets.resize,
            EnumClaimWidgets.add
        ]);
        this.claimScreens$.next([
            EnumClaimScreens.add,
            EnumClaimScreens.edit,
            EnumClaimScreens.delete
        ]);
    }
}
