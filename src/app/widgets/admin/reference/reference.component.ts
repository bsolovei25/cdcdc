import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IReferenceTypes } from '../../../dashboard/models/ADMIN/references';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { ReferencesService } from '../../../dashboard/services/widgets/references.service';

@Component({
    selector: 'evj-reference',
    templateUrl: './reference.component.html',
    styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('refereneTable') public testBlock: ElementRef;

    isLoading: boolean = false;

    public valueCheck: boolean;
    public valueUniqCheck: boolean;

    public clickFio: boolean = true;
    public clickDate: boolean = false;

    public isEdit: boolean = false;

    public isAddBlockRecord: boolean = false;

    public isEditRecordBlock: boolean = false;

    isRefInput: boolean = false;
    isRecInput: boolean = false;
    isLongBlock: boolean = true;

    indexColumn: number = null;

    public newName: string;

    public data: IReferenceTypes[] = [

    ];

    public columnData: any = [];

    public datas: IReferenceTypes[] = [];

    public dataTable: any = []; //// НАПИСАТЬ МОДЕЛЬКУ
    public saveTable: any = [];

    public idReferenceClick: number;

    public addDate: Date;

    public columnObject = [];

    public editRecordIndex: number;

    public newValue: number;

    public checkTitle: number;

    public blockOut = [];
    public blockOutColumn = [];

    constructor(
        public widgetService: WidgetService,
        public referencesService: ReferencesService,
        public snackBar: SnackBarService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    setStyleScroll() {
        const rightScroll = document.getElementById('rightScrollRef');
        const leftScroll = document.getElementById('leftScrollRef');

        if (rightScroll) {
            if (rightScroll.scrollHeight !== rightScroll.clientHeight) {
                rightScroll.style.cssText = "margin-left: 5px; width: calc(100% - 45px);";
            } else {
                rightScroll.style.cssText = "margin-left: 10px; width: calc(100% - 50px);";

            }
        }

        if (leftScroll) {
            if (leftScroll.scrollHeight !== leftScroll.clientHeight) {
                leftScroll.style.cssText = "margin-right: 0px; width: calc(100% - 5px);";
            } else {
                leftScroll.style.cssText = "margin-right: -5px; width: calc(100% - 5px);";
            }
        }
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        this.blockNeed();
        this.setStyleScroll();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.getReference()
        );
    }

    protected dataHandler(ref: any): void {
        //this.data = ref.chartItems;
    }

    getReference() {
        return this.referencesService.reference$.subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
            this.setStyleScroll();
        });
    }

    getTable(id: number) {
        return this.referencesService.getTableReference(id).subscribe((data) => {
            this.dataTable = data;
            this.saveTable = data;
            this.blockNeed();
            this.setStyleScroll();
        });
    }

    onClickReference(data, index) {
        this.checkTitle = null;
        this.idReferenceClick = data.id;
        this.isLongBlock = true;
        this.isAddBlockRecord = false;

        this.indexColumn = index;

        this.columnData = this.data[this.indexColumn].columns;

        this.getTable(data.id);
        this.setStyleScroll();
    }

    onClickItemReference(data) {
        data.open = !data.open;

        this.isLongBlock = true;
        for (let item of this.dataTable.data) {
            if (item.open) {
                this.isLongBlock = false;
            }
        }

        this.setStyleScroll();
    }

    changeSwap(item) {
        this.checkTitle = item.id;
    }

    onAddBlockRecord() {
        if (this.idReferenceClick !== null && this.idReferenceClick !== undefined) {
            this.isAddBlockRecord = true;
            this.isLongBlock = false;
        }

    }

    onPushRecord() {
        this.isAddBlockRecord = false;
        this.isLongBlock = true;
        let columnsObj = [];
        let obj: any = [];
        for (let i of this.data[this.indexColumn].columns) {
            if (i.name !== 'Id' && i.name !== 'Name') {
                let test;
                this.columnObject.find(e => {
                    if (e.idColumn === i.id) {
                        test = e.value;
                    }
                }
                );

                if (test === undefined) {
                    obj = {
                        referenceColumnId: i.id,
                        valueString: null,
                        valueDateTime: null,
                        valueNumber: null,
                        valueInt: null
                    }
                } else {
                    if (i.columnTypeId === 'typeDateTime') {
                        obj = {
                            referenceColumnId: i.id,
                            valueString: null,
                            valueDateTime: test,
                            valueInt: null
                        }
                    } else if (i.columnTypeId === 'typeString') {
                        obj = {
                            referenceColumnId: i.id,
                            valueString: test,
                            valueDateTime: null,
                            valueInt: null
                        }
                    } else if (i.columnTypeId === 'typeInt') {
                        obj = {
                            referenceColumnId: i.id,
                            valueString: null,
                            valueDateTime: null,
                            valueInt: +test,
                        }
                    }
                }
                columnsObj.push(obj);
            }

        }
        let object: any = {
            name: this.newName,
            referenceTypeId: this.idReferenceClick,
            columnsData: columnsObj,
        };

        this.columnObject = [];
        this.newName = null;

        this.referencesService.pushReferenceData(object).subscribe(ans => {
            this.dataTable.data.push(object);
        });

    }

    onChangeValue(event, id) {
        const obj = {
            idColumn: id,
            value: event.target.value,
        }
        this.columnObject.push(obj);
    }

    deleteRecord(item): void {
        this.referencesService.removeDataRecord(item.id).subscribe(ans => {
            const indexDelete = this.dataTable.data.indexOf(item);
            this.dataTable.data.splice(indexDelete, 1);
        });

    }

    searchReference(event: any) {
        if (event.key === "Backspace") {
            this.data = this.datas;
        }
        const record = event.currentTarget.value.toLowerCase();
        const filterData = this.data.filter(
            (e) =>
                e.name.toLowerCase().indexOf(record.toLowerCase()) > -1

        );
        this.data = filterData;
        if (!event.currentTarget.value) {
            this.data = this.datas;
        }
    }

    searchRecords(event: any) {
        if (this.checkTitle === null) {
            this.snackBar.openSnackBar('Выберите колонку для поиска', 'snackbar-red');
        } else {
            if (event.key === 'Backspace') {
                this.getTable(this.idReferenceClick);
            }
            const record = event.currentTarget.value.toLowerCase();

            this.dataTable.data = this.dataTable.data.filter((e) => {
                return e.columnsData = e.columnsData.find((el) => {
                    if (el.referenceColumnId === this.checkTitle) {
                        if (el.valueString) {
                            return el.valueString.toLowerCase().indexOf(record.toLowerCase()) > -1;
                        } else if (el.valueInt) {
                            return el.valueInt.toString().toLowerCase().indexOf(record.toLowerCase()) > -1;
                        } else if (el.valueDateTime) {
                            return el.valueDateTime.toLowerCase().indexOf(record.toLowerCase()) > -1;
                        }
                    }
                });
            });
            if (!event.currentTarget.value) {
                this.getTable(this.idReferenceClick);
            }
        }
    }

    onBlockEditRecordName(item) {
        item.edit = true;
    }

    onEditRecordName(item) {
        item.edit = false;
    }

    onBlockEditRecord(i, item) {
        this.isEdit = true;
        const result = item.columnsData.find((el) => {
            if (i.id === el.referenceColumnId) {
                el.edit = true;
                return true;
            }
        });
        if (result === undefined) {
            const obj = {
                referenceColumnId: i.id,
                edit: true,
            };
            item.columnsData.push(obj);
        }

    }

    onEditRecord(i, item) {
        this.isEdit = false;
        item.columnsData.find((el) => {
            if (i.id === el.id) {
                el.edit = false;
            }
        });
        this.referencesService.putEditData(item).subscribe(ans => {
            // this.isLongBlock = true;
            this.getTable(item.referenceTypeId);
            this.newName = null;
        });
    }

    dateTimePickerNew(event, id) {
        if (event) {
            const obj = {
                idColumn: id,
                value: event,
            }
            this.columnObject.push(obj);
        }
    }

    dateTimePickerEdit(event, item) {
        if (event) {
            item.valueDateTime = event;
        }
    }

    blockNeed(): void {
        this.blockOutColumn = [];
        this.blockOut = [];
        if (this.dataTable?.data) {
            const heightTemplate = this.dataTable.data.length * 40;
            const heightOut = (this.testBlock.nativeElement.clientHeight - heightTemplate) / 40;
            for (let i = 0; i < heightOut - 1; i++) {
                this.blockOut.push(i);
            }
            for (let j = 0; j < this.columnData.length - 1; j++) {
                this.blockOutColumn.push(j);
            }
        }
    }
}
