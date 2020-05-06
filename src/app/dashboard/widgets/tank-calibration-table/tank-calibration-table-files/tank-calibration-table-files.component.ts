import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from '../../../services/widgets/tank-calibration-table.service';
import { ICalibrationTable } from '../tank-calibration-table.component';


interface IDataSource extends ICalibrationTable {
    childredTanks?: ICalibrationTable[];
    isVisible?: boolean;
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

    static itemCols: number = 18;
    static itemRows: number = 14;

    expandedElement: SelectionModel<any> = new SelectionModel(true);
    chooseElement: SelectionModel<ICalibrationTable> = new SelectionModel(false);
    @Input() set chooseEl(data: ICalibrationTable) {
        if (data) {
            this.chooseElement.select(data);
            this.selectId = data.uid;
            const el = this.localeData.find(val => val.uid === data?.parentUid);
            if (el) {
                this.expandedElement.select(el);
            }
            this.loadItem(data);
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
        private calibrationService: TankCalibrationTableService,
        private chDet: ChangeDetectorRef,
    ) { }
    ngOnInit(): void {
        this.loadHistory();
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
        this.chooseElement.select(element);
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
                    element.isVisible = false; // показывать
                    isLenChild = true;
                } else {
                    element.isVisible = true;  // скрыть
                }
            });
            if (val.name.toLowerCase()
                .includes(event?.target?.value.toLowerCase()) || isLenChild) {
                val.isVisible = false;
            } else {
                val.isVisible = true;
            }
        });
        this.dataSourceTanks = this.localeData?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup);
        this.dataSourceTanks.push({ name: '', isGroup: false, uid: 'last-row' });
    }

}
