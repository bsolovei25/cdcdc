import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReferencesService } from '../../services/references.service';
import { IReferenceTypes, IReferenceColumnsType } from '../../models/references';

@Component({
    selector: 'evj-admin-references',
    templateUrl: './admin-references.component.html',
    styleUrls: ['./admin-references.component.scss'],
})
export class AdminReferencesComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    static itemCols = 18;
    static itemRows = 14;

    public code: string;
    public title: string;
    public units: string = ' ';
    public previewTitle: string = 'default';
    public options;

    isReference: boolean = false;
    referencesOn = 0;
    massCheck = [];

    inputClickRef: boolean = false;
    inputClickName: boolean = false;

    isChangeName: boolean = false;

    valueCheck: boolean = true;
    valueUniqCheck: boolean = true;

    onClickPushReference: boolean = false;
    onClickPushRecord: boolean = false;

    isRefInput: boolean = false;
    isRecInput: boolean = false;

    newRecordInReference: string;

    newFioRecord: string;
    newType: string;
    newValue: boolean;
    newUniqValue: boolean;

    indexColumn: number = 0;

    isLongBlock: boolean = true;

    public datas: IReferenceTypes[] = [
        {
            id: 1,
            createdAt: new Date(),
            createdBy: new Date(),
            name: 'Професии',
            referenceColumns: [
                {
                    id: 1,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: 'ФИО',
                    columnTypeId: 'Текст',
                    columnName: 'ФИО',
                    isRequred: true,
                    isUnique: false,
                },
                {
                    id: 2,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: 'Дата рождения',
                    columnTypeId: 'Дата',
                    columnName: 'Дата рождения',
                    isRequred: false,
                    isUnique: true,
                },
            ],
        },
        {
            id: 2,
            createdAt: new Date(),
            createdBy: new Date(),
            name: 'Установки',
            referenceColumns: [
                {
                    id: 1,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: 'Дата рождения',
                    columnTypeId: 'Дата',
                    columnName: 'Дата рождения',
                    isRequred: false,
                    isUnique: false,
                },
            ],
        },
    ];

    public data: IReferenceTypes[] = [];

    public dataType: IReferenceColumnsType[] = [
        {
            id: 1,
            name: 'Tекст',
        },
        {
            id: 2,
            name: 'Дата',
        },
        {
            id: 3,
            name: 'Что-то там',
        },
    ];

    constructor(
        public widgetService: NewWidgetService,
        public referencesService: ReferencesService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(id).subscribe((data) => {
                (this.code = data.code),
                    (this.title = data.title),
                    (this.options = data.widgetOptions);
            })
        );
    }

    ngOnInit() {
        this.subscriptions.push(
            this.referencesService.getReference().subscribe((data) => {
                this.datas = data;
                this.data = this.datas;
            })
        );
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    onRefInputClick() {
        this.inputClickRef = true;
        this.inputClickName = false;
    }

    onNameInputClick() {
        this.inputClickRef = false;
        this.inputClickName = true;
    }

    onClickReference(data, index) {
        let checkUniq = <HTMLInputElement>document.getElementById('checkBoxUniqValue');
        let checkValue = <HTMLInputElement>document.getElementById('checkBoxValue');

        for (let item of this.data) {
            item.open = false;
        }

        for (let item of data.referenceColumns) {
            if (item.isRequred) {
                item.checked;
            }

            if (item.isUnique) {
                item.checked;
            }
        }

        data.open = true;
        this.indexColumn = index;
    }

    onClickItemReference(data) {
        data.open = !data.open;
        this.isLongBlock = true;
        for (let item of this.data[this.indexColumn].referenceColumns) {
            if (item.open) {
                this.isLongBlock = false;
            }
        }
    }

    onChangeName() {
        this.isChangeName = !this.isChangeName;
    }

    changeSwap(item) {
        this.data.find((el) =>
            el.referenceColumns.find((e) => {
                if (e === item) {
                    e.isRequred = !e.isRequred;
                }
            })
        );
    }

    changeUniqSwap(item) {
        this.data.find((el) =>
            el.referenceColumns.find((e) => {
                if (e === item) {
                    e.isUnique = !e.isUnique;
                }
            })
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            this.data[this.indexColumn].referenceColumns,
            event.previousIndex,
            event.currentIndex
        );
    }

    onClickEditReference(item): void {}

    onClickDeleteReference(item): void {}

    onPushBlockInReference(): void {
        this.onClickPushReference = true;
    }

    onPushBlockInRecord(): void {
        this.onClickPushRecord = true;
        this.isLongBlock = false;
    }

    onPushReference(): void {
        this.onClickPushReference = false;
        let object = {
            name: this.newRecordInReference,
        };
        if (
            this.newRecordInReference.trim().length > 0 &&
            this.newRecordInReference !== undefined
        ) {
            this.data.push(object);
            this.referencesService.pushReference(object);
            this.newRecordInReference = null;
        }
    }

    onPushRecord(): void {
        this.onClickPushRecord = false;
        let object = {
            name: this.newFioRecord,
            referenceFIO: [],
        };
        if (this.newFioRecord.trim().length > 0 && this.newFioRecord !== undefined) {
            this.data.push(object);
            this.newFioRecord = null;
        }
    }

    searchRecords(event: any) {
        const record = event.currentTarget.value.toLowerCase();
        const filterData = this.data.filter(
            (e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1
        );

        this.data = filterData;
        if (!event.currentTarget.value) {
            this.data = this.datas;
        }
    }
}
