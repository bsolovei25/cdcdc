import { Component, OnInit, Inject, OnDestroy, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from '../../../models/events-widget';
import { TankCalibrationTableService } from '../../../services/tank-calibration-table.service';

export interface ICalibrationTable {
    uid: string;
    name: string;
    startDate?: Date;
    endDate?: Date;
    warningLevel?: 'none' | 'warning' | 'expired';
    parentUid?: string;
    parentName?: string;
    isGroup: boolean;
}

interface ITanksHistory {
    name: string;
    data: {
        editDate: Date;
        user: IUser;
        empty: any;
        updateDate: Date;
        comment: string;
    }[];
}

@Component({
    selector: 'evj-tank-calibration-table-files',
    templateUrl: './tank-calibration-table-files.component.html',
    styleUrls: ['./tank-calibration-table-files.component.scss'],
})
export class TankCalibrationTableFilesComponent implements OnInit, OnDestroy {

    static itemCols: number = 18;
    static itemRows: number = 14;



    expandedElement: SelectionModel<any> = new SelectionModel(true);

    localeData: ICalibrationTable[] = [];
    dataSource: ICalibrationTable[] = [];

    chooseTanks: any[];
    endTr = [];
    endTr2 = [];

    @Input() set data(value) {
        this.localeData = value;
        this.dataSource = value;
    }

    @Input() set isReport(event) {
        setTimeout(() => {
            this.blockNeed();
            this.blockNee2d();
        }, 100);
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        this.blockNeed();
        this.blockNee2d();
    }

    @ViewChild('tableBody3') table3: ElementRef;
    @ViewChild('tableRight4') tableRight4: ElementRef;

    constructor(
        private calibrationService: TankCalibrationTableService,
    ) { }
    ngOnInit(): void {
        console.log(new Date().toJSON());
    }

    ngOnDestroy(): void {
    }

    async loadItem(element: ICalibrationTable): Promise<void> {
        try {
            const el = await this.calibrationService.getHistoryTanks(element?.uid);
            this.chooseTanks = el;
            console.log(el);
        } catch (error) {

        }
    }

    getChildrenRows(element: ICalibrationTable): any {
        return this.localeData.filter(val => element?.uid === val?.parentUid);
    }

    chooseTank(element: ICalibrationTable): void {
        this.loadItem(element);
    }

    blockNeed(): void {
        this.endTr = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.table3.nativeElement.clientHeight - heightTemplate) / 26;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr.push(i);
        }
    }
    blockNee2d(): void {
        this.endTr2 = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.tableRight4.nativeElement.clientHeight - heightTemplate) / 25;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr2.push(i);
        }
    }


}
