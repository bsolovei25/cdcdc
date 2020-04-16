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
    dataSourceTanks: ICalibrationTable[] = [];

    chooseTanks: any[];
    endTr = [];
    endTr2 = [];

    @Input() data;
    @Input() dataTanks;

    @ViewChild('tableBody3') table3: ElementRef;
    @ViewChild('tableRight4') tableRight4: ElementRef;

    constructor(
        private calibrationService: TankCalibrationTableService,
    ) { }
    ngOnInit(): void {
        this.dataSource = this.data;
        this.dataSourceTanks = this.dataTanks;
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

    searchInput(event): void {
        this.dataSource = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && val.isGroup);
        this.dataSourceTanks = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup);
    }


}
