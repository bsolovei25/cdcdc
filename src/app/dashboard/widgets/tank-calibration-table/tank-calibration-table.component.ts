import { Component, OnInit, Inject, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from '../../services/tank-calibration-table.service';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatDialog } from '@angular/material/dialog';
import { TanksTableComponent } from './tanks-table/tanks-table.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { FormControl, Validators } from '@angular/forms';

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
    dataSource: ICalibrationTable[] = [];
    dataSourceTanks: ICalibrationTable[] = [
        { name: '', isGroup: false, uid: 'last-row' }
    ];

    tanksAvailable: ICalibrationTable[] = [];
    onlineTable: IOnlineTable[];

    isComment: boolean = false;

    postDate: {
        id, newDate: Date, comment: string, newDateType: 'startDate' | 'endDate'
    } | null;

    sort: { name: 'upStart' | 'bottomStart' | 'upEnd' | 'bottomEnd', value: boolean } | null = null;

    isReport: boolean = true;
    isRefInput: boolean = false;

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
                        .filter(val => !val.parentUid && !val.isGroup),
                    { name: '', isGroup: false, uid: 'last-row' }];
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

    getChildrenRows(element: ICalibrationTable): any {
        return this.data.filter(val => element?.uid === val?.parentUid);
    }

    selectTable(event: boolean): void {
        this.isReport = event;
    }

    async postNewDate(id, newDate: Date, comment: string, newDateType: 'startDate' | 'endDate') {
        try {
            await this.calibrationService.postDataFile(id, newDate, comment, newDateType)
        } catch (error) {

        }
    }

    sortStart(): void {
        if (!this.sort || this.sort.name === 'bottomStart' || this.sort.name === 'bottomEnd') {
            this.sort = { name: 'upStart', value: true };
            this.dataSource.sort((a, b) => a?.startDate?.getTime() - b?.startDate?.getTime());
        } else {
            if (this.sort.name === 'upStart') {
                const a = this.dataSource.sort((a, b) => b?.startDate?.getTime() - a?.startDate?.getTime());
                const ba = this.dataSourceTanks.sort((a, b) => {
                    if (b?.startDate && a?.startDate) {
                        return b?.startDate?.getTime() - a?.startDate?.getTime()
                    }
                });
                console.log(ba);

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

    closeComment() {
        this.showComment.clear();
        this.postDate = null;
        this.comment.setValue('');
    }
    doneComment() {
        this.postNewDate(this.postDate.id, this.postDate.newDate, this.comment.value, this.postDate.newDateType);
        this.showComment.clear();
        this.postDate = null;
        this.comment.setValue('');
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

    async deleteTanks(uid: string): Promise<void> {
        try {
            await this.calibrationService.deleteTank(uid);
            this.snackBar.openSnackBar('Резервуар удален');
            this.loadItem(true);
        } catch (error) {
            console.error(error);
        }
    }

    async clickItem(element: ICalibrationTable): Promise<void> {
        this.chooseElement.select(element);
        try {
            this.onlineTable = await this.calibrationService.getTankOnlineTable(element.uid);
        } catch (error) {
            console.error(error);
        }
    }

    sortDesc(date) {
        const data1 = new Date();
        const data2 = new Date();

        console.log(this.formatDate(data1));

        const time = [
            1537043086974,
            1536043086974,
            1535043086974,
            1534043086974,
            1533043086974,
        ];
        return time.sort((a, b) => b - a);
    }

    formatDate(date) {
        return Intl.DateTimeFormat('ru').format(date);
    }

    downloadFile(id: string): void {
        window.open(`http://deploy.funcoff.club:6555/api/graduation-table/graduation/tanks/${id}/table`);
    }

}
