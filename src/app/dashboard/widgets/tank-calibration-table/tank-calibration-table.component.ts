import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from '../../services/tank-calibration-table.service';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatDialog } from '@angular/material/dialog';
import { TanksTableComponent } from './tanks-table/tanks-table.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

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

export interface IOnlineTable {
    beltNumber: number;
    height: number;
    volume: number;
    lastRow?: string;
}

interface IDataSource extends ICalibrationTable {
    childredTanks?: ICalibrationTable[];
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
    chooseElement: SelectionModel<ICalibrationTable> = new SelectionModel(false);
    showComment: SelectionModel<any> = new SelectionModel(true);

    public toDate: Date;
    public fromDate: Date;
    public isCurrent: boolean;
    public dateNow: Date;

    comment: FormControl = new FormControl('', Validators.required);

    data: ICalibrationTable[] = [];
    dataSource: IDataSource[] = [];
    dataSourceTanks: ICalibrationTable[] = [
        { name: '', isGroup: false, uid: 'last-row' }
    ];

    tanksAvailable: ICalibrationTable[] = [];
    onlineTable: IOnlineTable[] = [
        { beltNumber: 0, height: 0, volume: 0, lastRow: 'last-row' }
    ];

    isComment: boolean = false;

    postDate: {
        id, newDate: Date, comment: string, newDateType: 'startDate' | 'endDate'
    } | null;

    sort: { name: 'upStart' | 'bottomStart' | 'upEnd' | 'bottomEnd', value: boolean } | null = null;

    isReport: boolean = true;
    isRefInput: boolean = false;

    deleteElement: boolean = false;
    deleteItem: string;

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
                    this.dataSource = this.data
                        .filter(val => val.isGroup);
                    this.dataSource.map((value) => {
                        value.childredTanks = this.getChildrenRows(value);
                        this.undefinedSortStartDate(value.childredTanks);
                    });
                    this.dataSourceTanks = [...this.data
                        .filter(val => !val.parentUid && !val.isGroup),
                    { name: '', isGroup: false, uid: 'last-row' }];
                    this.undefinedSortStartDate(this.dataSourceTanks);
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

    getChildrenRows(element: ICalibrationTable): ICalibrationTable[] {
        return this.data.filter(val => element?.uid === val?.parentUid);
    }

    selectTable(event: boolean): void {
        this.isReport = event;
    }


    sortStart(): void {
        if (!this.sort || this.sort.name === 'bottomStart' || this.sort.name === 'bottomEnd') {
            this.sort = { name: 'upStart', value: true };
            this.dataSource.map(data => {
                this.sortHighStartDate(data.childredTanks);
            });
            this.sortHighStartDate(this.dataSourceTanks);
        } else {
            if (this.sort.name === 'upStart') {
                this.dataSource.map(data => {
                    this.sortLowStartDate(data.childredTanks);
                });
                this.sortLowStartDate(this.dataSourceTanks);
                this.sort = { name: 'upEnd', value: true };
            } else {
                this.sort = null;
            }
        }
    }

    sortEnd(): void {
        this.undefinedSortEndDate(this.dataSourceTanks);
        if (!this.sort || this.sort.name === 'upStart' || this.sort.name === 'upEnd') {
            this.sort = { name: 'bottomStart', value: true };
            this.dataSource.map(data => {
                this.sortHighEndDate(data.childredTanks);
            });
            this.sortHighEndDate(this.dataSourceTanks);
        } else {
            if (this.sort.name === 'bottomStart') {
                this.dataSource.map(data => {
                    this.sortLowEndDate(data.childredTanks);
                });
                this.sortLowEndDate(this.dataSourceTanks);
                this.sort = { name: 'bottomEnd', value: true };
            } else {
                this.sort = null;
            }
        }
    }

    sortLowStartDate<T extends ICalibrationTable>(array: T[]): T[] {
        return array.sort((a, b) => new Date(a.startDate).getTime()
            - new Date(b.startDate).getTime());
    }

    sortHighStartDate<T extends ICalibrationTable>(array: T[]): T[] {
        return array.sort((a, b) => new Date(b?.startDate)?.getTime()
            - new Date(a?.startDate)?.getTime());
    }

    sortLowEndDate<T extends ICalibrationTable>(array: T[]): T[] {
        return array.sort((a, b) => new Date(a?.endDate)?.getTime()
            - new Date(b?.endDate)?.getTime());
    }

    sortHighEndDate<T extends ICalibrationTable>(array: T[]): T[] {
        return array.sort((a, b) => new Date(b?.endDate)?.getTime()
            - new Date(a?.endDate)?.getTime());
    }

    undefinedSortStartDate<T extends ICalibrationTable>(array: T[]): T[] {
        return array.sort((a, b) => +b.hasOwnProperty('startDate')
            - +a.hasOwnProperty('startDate'));
    }

    undefinedSortEndDate<T extends ICalibrationTable>(array: T[]): T[] {
        return array.sort((a, b) => +b.hasOwnProperty('endDate')
            - +a.hasOwnProperty('endDate'));
    }

    searchInput(event): void {
        this.dataSource = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && val.isGroup);
        this.dataSourceTanks = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup)
        this.dataSourceTanks.push({ name: '', isGroup: false, uid: 'last-row' });
    }

    public dateTimePickerInput(date: Date, isStart: boolean, id: string): void {
        this.isComment = true;
        this.showComment.select(id);
        if (!isStart) {
            this.fromDate = new Date(date);
            this.postDate = {
                id, newDate: this.fromDate,
                comment: this.comment.value,
                newDateType: 'startDate'
            };
        } else {
            this.toDate = new Date(date);
            this.postDate = {
                id, newDate: this.toDate,
                comment: this.comment.value,
                newDateType: 'endDate'
            };
        }
    }

    closeComment(): void {
        this.showComment.clear();
        this.postDate = null;
        this.comment.setValue('');
    }

    doneComment(): void {
        this.postNewDate(this.postDate.id, this.postDate.newDate,
            this.comment.value, this.postDate.newDateType);
        this.showComment.clear();
        this.postDate = null;
        this.comment.setValue('');
    }

    async postNewDate(id: string, newDate: Date, comment: string,
        newDateType: 'startDate' | 'endDate'): Promise<void> {
        try {
            await this.calibrationService
                .postDataFile(id, newDate, comment, newDateType);
            this.snackBar.openSnackBar('Дата успешно изменена');
        } catch (error) { }
    }

    openDialog(element): void {
        const dialogRef = this.dialog
            .open(UploadFormComponent, {
                data: {},
                autoFocus: true,
            });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.uploadFile(result, element.uid);
            }
        });
    }

    async uploadFile(result, id: string): Promise<void> {
        try {
            await this.calibrationService.postNewDate(id, result, result.file);
            this.snackBar.openSnackBar('Файл загружен успешно');
        } catch (error) {
            this.snackBar.openSnackBar('Файл не загружен', 'snackbar-red');
            console.error(error);
        }
    }

    openTanksTable(): void {
        const dialogRef = this.dialog
            .open(TanksTableComponent, {
                data: this.tanksAvailable,
                autoFocus: true,
            });
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

    deleteUI(uid: string): void {
        this.deleteElement = true;
        this.deleteItem = uid;
    }

    closeDialog(): void {
        this.deleteElement = false;
        this.deleteItem = null;
    }

    async deleteTanks(): Promise<void> {
        this.deleteElement = false;
        try {
            await this.calibrationService.deleteTank(this.deleteItem);
            this.deleteElement = false;
            this.snackBar.openSnackBar('Резервуар удален');
            this.loadItem(true);
        } catch (error) {
            this.deleteElement = false;
            console.error(error);
        }
    }

    async clickItem(element: ICalibrationTable): Promise<void> {
        this.chooseElement.select(element);
        try {
            this.onlineTable = await this.calibrationService.getTankOnlineTable(element.uid);
            this.onlineTable.push({ beltNumber: 0, height: 0, volume: 0, lastRow: 'last-row' })
        } catch (error) {
            console.error(error);
        }
    }

    downloadFile(id: string): void {
        window.open(`http://deploy.funcoff.club:6555/api/graduation-table/graduation/tanks/${id}/table`);
    }

}
