import { Component, OnInit, Inject, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from '../../services/tank-calibration-table.service';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { TanksTableComponent } from './tanks-table/tanks-table.component';
import { SnackBarService } from '../../services/snack-bar.service';

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

@Component({
    selector: 'evj-tank-calibration-table',
    templateUrl: './tank-calibration-table.component.html',
    styleUrls: ['./tank-calibration-table.component.scss'],
})
export class TankCalibrationTableComponent extends WidgetPlatform implements OnInit, OnDestroy {

    columnsToDisplay: string[] = [
        'Наименование',
        'Дата начала калибровки',
        'Дата окончания калибровки',
        'Действия с калибровками'
    ];

    static itemCols: number = 18;
    static itemRows: number = 14;

    expandedElement: SelectionModel<any> = new SelectionModel(true);

    public toDate: Date;
    public fromDate: Date;
    public isCurrent: boolean;
    public dateNow: Date;

    data: ICalibrationTable[] = [];
    dataSource: ICalibrationTable[] = [];
    dataSourceTanks: ICalibrationTable[] = [];

    tanksAvailable: ICalibrationTable[] = [];

    endTr = [];
    endTr2 = [];

    sort: { name: 'upStart' | 'bottomStart' | 'upEnd' | 'bottomEnd', value: boolean } | null = null;

    isReport: boolean = true;

    isRefInput: boolean = false;

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        this.blockNeed();
        this.blockNee2d();
    }

    @ViewChild('tableBody') table: ElementRef;
    @ViewChild('tableRight') tableRight: ElementRef;

    constructor(
        public widgetService: WidgetService,
        private calibrationService: TankCalibrationTableService,
        private dialog: MatDialog,
        public snackBar: SnackBarService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.loadItem();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = ref;
        }
    }

    private async loadItem(onlyTanks: boolean = false): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.calibrationService.getTanks()
                .then((data) => {
                    this.data = data;
                    this.dataSource = [...this.data
                        .filter(val => val.isGroup)];
                    this.dataSourceTanks = [...this.data
                        .filter(val => !val.parentUid && !val.isGroup)];
                })
        );
        if (!onlyTanks) {
            dataLoadQueue.push(
                this.calibrationService.getTankAvailable().then((data) => {
                    this.tanksAvailable = data;
                })
            );
        }
        dataLoadQueue.push();
        if (dataLoadQueue.length > 0) {
            try {
                await Promise.all(dataLoadQueue);
            } catch (err) {
                console.error(err);
            }
        }
    }

    async deleteItem(element: ICalibrationTable): Promise<void> {
        try {
            this.calibrationService.deleteTank(element.uid);
        } catch (error) {
        }
    }

    getChildrenRows(element: ICalibrationTable): any {
        return this.data.filter(val => element?.uid === val?.parentUid);
    }

    selectTable(event: boolean): void {
        this.isReport = event;
    }

    sortStart(): void {
        if (!this.sort || this.sort.name === 'bottomStart' || this.sort.name === 'bottomEnd') {
            this.sort = { name: 'upStart', value: true };
            this.dataSource.sort((a, b) => a?.startDate?.getTime() - b?.startDate?.getTime());
        } else {
            if (this.sort.name === 'upStart') {
                this.dataSource.sort((a, b) => b?.startDate?.getTime() - a?.startDate?.getTime());
                this.sort = { name: 'upEnd', value: true };
            } else {
                this.sort = null;
            }
        }
    }
    sortEnd(): void {
        if (!this.sort || this.sort.name === 'upStart' || this.sort.name === 'upEnd') {
            this.sort = { name: 'bottomStart', value: true };
            this.dataSource.sort((a, b) => a?.endDate?.getTime() - b?.endDate?.getTime());
        } else {
            if (this.sort.name === 'bottomStart') {
                this.dataSource.sort((a, b) => b?.endDate?.getTime() - a?.endDate?.getTime());
                this.sort = { name: 'bottomEnd', value: true };
            } else {
                this.sort = null;
            }
        }
    }

    searchInput(event): void {
        this.dataSource = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()));
    }

    blockNeed(): void {
        this.endTr = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.table?.nativeElement?.clientHeight - heightTemplate) / 28;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr.push(i);
        }
    }
    blockNee2d(): void {
        this.endTr2 = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.tableRight?.nativeElement?.clientHeight) / 29;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr2.push(i);
        }
    }

    public dateTimePickerInput(date: Date, isStart: boolean): void {
        console.log(date);

        if (this.isCurrent) {
            return;
        }
        if (isStart) {
            this.fromDate = new Date(date);
        } else {
            this.toDate = new Date(date);
        }
        this.setDates();
    }

    private setDates(): void {
        const dates = {
            fromDateTime: this.fromDate,
            toDateTime: this.toDate,
        };
    }

    openDialog(element): void {
        console.log(element);
        const dialogRef = this.dialog
            .open(UploadFormComponent, {
                data: {
                    title: 'Выбор номенклатуры',
                },
                autoFocus: true,
            });
        // when dialog is closed, check result
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.calibrationService.postNewDate(element.uid, result, result.file);
            }
        });
    }

    openTanksTable(): void {
        const dialogRef = this.dialog
            .open(TanksTableComponent, {
                data: this.tanksAvailable,
                autoFocus: true,
            });
        // when dialog is closed, check result
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.putTanks(result?.[0]?.uid);
            }
        });
    }

    async putTanks(uid: string): Promise<void> {
        try {
            await this.calibrationService.putTank(uid);
            this.snackBar.openSnackBar('Резервуар добавлен');
            this.loadItem(true);
        } catch (error) {
            console.error(error);
        }
    }


}
