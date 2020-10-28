import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../dashboard/models/EVJ/events-widget';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CdMatBalanceService } from '../../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { IAllEstablishedFacts } from '../../cd-mat-balance/cd-mat-balance.component';

export interface ICDModalWindow {
    users: IUser[];
    responsible: IUser;
    date: Date;
    time: Date;
    establishedFacts: string;
    allEstablishedFacts: string[];
    description: string;
    acceptText: string;
    acceptFunction?: () => void;
    cancelFunction?: () => void;
}

@Component({
    selector: 'evj-cd-modal-window',
    templateUrl: './cd-modal-window.component.html',
    styleUrls: ['./cd-modal-window.component.scss']
})
export class CdModalWindowComponent implements OnInit {
    @Input() public info: ICDModalWindow;

    users: IUser[] = [];
    isOpenStartDate: boolean = false;
    timeStart: FormControl = new FormControl(
        moment()
            .second(0)
            .minutes(0),
        [Validators.required]
    );
    allEstablishedFacts: IAllEstablishedFacts[] = [];

    constructor(private cdMatBalanceService: CdMatBalanceService) {
    }

    ngOnInit(): void {
        this.getDropDownFacts();
    }

    public accept(): void {
        try {
            this.info?.acceptFunction();
        } catch (err) {
            console.warn(err);
        } finally {
            this.info.cancelFunction();
        }
    }

    public cancel(): void {
        try {
            this.info.cancelFunction();
        } catch (err) {
            console.warn(err);
        } finally {
            this.info.cancelFunction();
        }
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public dateTimePickerInput(date: Date, isStart: boolean): void {
        if (!isStart) {
        }
    }

    async getDropDownFacts(): Promise<void> {
        try {
            this.allEstablishedFacts = await this.cdMatBalanceService.getEstablishedFactsArray();
        } catch (err) {
        }
    }

    openBlock(): void {
        this.isOpenStartDate = !this.isOpenStartDate;
    }

    onMouseExit(): void {
        setTimeout(() => {
            this.isOpenStartDate = false;
        }, 700);
    }
}
