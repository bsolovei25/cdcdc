import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from '../../../services/widgets/tank-calibration-table.service';
import { ICalibrationTable } from '../tank-calibration-table.component';
import { AppConfigService } from '@core/service/app-config.service';


interface IDataSource extends ICalibrationTable {
    childredTanks?: ICalibrationTable[];
    isInvisible?: boolean;
}
interface ITanksHistory {
    createdAt: Date;
    createdBy: string;
    action: string;
    newValue: string;
    comment: string;
    tableId?: number;
}

@Component({
    selector: 'evj-tank-calibration-table-files',
    templateUrl: './tank-calibration-table-files.component.html',
    styleUrls: ['./tank-calibration-table-files.component.scss'],
})
export class TankCalibrationTableFilesComponent implements OnInit {

    public readonly restUrl: string = '';

    static itemCols: number = 18;
    static itemRows: number = 14;

    expandedElement: SelectionModel<string> = new SelectionModel(true);
    chooseElement: SelectionModel<string> = new SelectionModel(false);
    @Input() set chooseEl(data: ICalibrationTable) {
        if (data) {
            this.setData(data);
        }
    }

    @Output() selectOut: EventEmitter<string> = new EventEmitter();

    localeData: ICalibrationTable[] = [];
    dataSource: IDataSource[] = [];
    dataSourceTanks: IDataSource[] = [{ name: '', isGroup: false, uid: 'last-row' }];
    selectId: string = '';

    chooseTanks: ITanksHistory[] = [
        {
            comment: 'last-row',
            action: '', createdAt: new Date(),
            createdBy: '', newValue: ''
        }
    ];

    isRefInput: boolean = false;

    @ViewChild('tableBody3') table3: ElementRef;
    @ViewChild('tableRight4') tableRight4: ElementRef;

    constructor(
        private appConfigService: AppConfigService,
        private calibrationService: TankCalibrationTableService,
    ) {
        this.restUrl = this.appConfigService.restUrl;
    }
    ngOnInit(): void {
        if (this.localeData.length === 0) {
            this.loadHistory();
        }
    }

    async setData(data: ICalibrationTable): Promise<void> {
        if (this.localeData.length === 0) {
            await this.loadHistory();
        }
        const el2 = this.localeData.find(val => val.uid === data.uid);
        if (el2) {
            this.chooseElement.select(el2.uid);
            this.selectId = el2.uid;
            const el = this.localeData.find(val => val.uid === data?.parentUid);
            if (el) {
                this.expandedElement.select(el.uid);
            }
            this.loadItem(data);
        }
    }

    async loadHistory(): Promise<void> {
        try {
            const data = await this.calibrationService.getTanksHistory();
            this.localeData = data;
            this.dataSource = this.localeData
                .filter(val => val.isGroup);
            this.dataSource.map((value) => {
                value.childredTanks = this.getChildrenRows(value);
            });
            this.dataSourceTanks = [...this.localeData
                .filter(val => !val.parentUid && !val.isGroup),
            { name: '', isGroup: false, uid: 'last-row' }];
        } catch (error) {

        }
    }

    async loadItem(element: ICalibrationTable): Promise<void> {
        try {
            const el = await this.calibrationService.getHistoryTanks(element?.uid);
            this.chooseTanks = [...el, {
                comment: 'last-row',
                action: '', createdAt: new Date(),
                createdBy: '', newValue: ''
            }];
        } catch (error) {

        }
    }

    getChildrenRows(element: ICalibrationTable): any {
        return this.localeData.filter(val => element?.uid === val?.parentUid);
    }

    chooseTank(element: ICalibrationTable): void {
        this.chooseElement.select(element.uid);
        this.selectId = element.uid;
        try {
            this.loadItem(element);
        } catch (error) {
            console.error(error);
        }
    }

    searchInput(event): void {
        this.dataSource?.map((val) => {
            let isLenChild: boolean = false;
            val.childredTanks.map(element => {
                if (element.name.toLowerCase()
                    .includes(event?.target?.value.toLowerCase())) {
                    element.isInvisible = false; // показывать
                    this.expandedElement.select(val.uid);
                    isLenChild = true;
                } else {
                    element.isInvisible = true;  // скрыть
                }
            });
            if (val.name.toLowerCase()
                .includes(event?.target?.value.toLowerCase()) || isLenChild) {
                val.isInvisible = false;
            } else {
                val.isInvisible = true;
                this.expandedElement.deselect(val.uid);
            }
        });
        this.dataSourceTanks = this.localeData?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup);
        this.dataSourceTanks.push({ name: '', isGroup: false, uid: 'last-row' });
        if (event?.target?.value.trim().toLowerCase() === '') {
            this.expandedElement.clear();
        }
    }

}
