import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
    chooseElement: SelectionModel<ICalibrationTable> = new SelectionModel(false);
    @Input() set chooseEl(data: ICalibrationTable) {
        if (data) {
            this.chooseElement.select(data);
            const el = this.dataSourceUI.find(val => val.uid === data?.parentUid);
            if (el) {
                this.expandedElement.select(el);
            }
            this.loadItem(data);
        }
    }

    @Output() selectOut: EventEmitter<string> = new EventEmitter();

    localeData: ICalibrationTable[] = [];

    dataSource: IDataSource[] = [];
    dataSourceTanks: ICalibrationTable[] = [];
    selectId: string = '';

    chooseTanks: ITanksHistory[] = [
        {
            comment: 'last-row',
            action: '', createdAt: new Date(),
            createdBy: '', newValue: ''
        }
    ];

    isRefInput: boolean = false;

    @Input() data: ICalibrationTable[] = [];
    @Input() dataSourceUI: IDataSource[] = [];
    @Input() dataSourceTanksL: ICalibrationTable[] = [];

    @ViewChild('tableBody3') table3: ElementRef;
    @ViewChild('tableRight4') tableRight4: ElementRef;

    constructor(
        private calibrationService: TankCalibrationTableService,
    ) { }
    ngOnInit(): void {
        this.localeData = this.data;
        this.dataSource = this.dataSourceUI;
        this.dataSourceTanks = this.dataSourceTanksL;
    }

    ngOnDestroy(): void {
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
        this.selectOut.emit(element.uid);
        this.selectId = element.uid;
        try {
            this.loadItem(element);
        } catch (error) {
            console.error(error);
        }
    }

    searchInput(event): void {
        this.dataSourceUI?.map((val) => {
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
        this.dataSourceTanks = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup);
        this.dataSourceTanks.push({ name: '', isGroup: false, uid: 'last-row' });

    }


}
