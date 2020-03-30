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

    valueNewCheck: boolean = false;
    valueUniqNewCheck: boolean = false;

    isClickPushReference: boolean = false;
    isClickPushRecord: boolean = false;


    isRefInput: boolean = false;
    isRecInput: boolean = false;

    newRecordInReference: string;

    newFioRecord: string;
    newType: string;
    newValue: boolean;
    newUniqValue: boolean;

    indexColumn: number = null;
    idReferenceClick: number;

    isLongBlock: boolean = true;

    public datas: IReferenceTypes[] = [
        {
            id: 1,
            createdAt: new Date(),
            createdBy: new Date(),
            name: 'Професии',
            columns: [
                {
                    id: 1,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: 'ФИО',
                    columnTypeId: 1,
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
                    columnTypeId: 2,
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
            columns: [
                {
                    id: 1,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: 'Дата рождения',
                    columnTypeId: 1,
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
            this.getReference()
        );
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    getReference() {
        return this.referencesService.getReference().subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
            this.idReferenceClick = this.data[0].id; ///ПОДУМАТЬ ЕСЛИ РЕФЕРЕНС НЕ БУДЕТ
        })
    }


    onClickReference(data, index) {

        this.idReferenceClick = data.id;

        for (let item of this.data) {
            if (data === item) {
                data.open = !data.open;
                if (data.open === false) {
                    this.indexColumn = null;
                }

            } else {
                item.open = false;
            }
        }

        if (data.columns !== null && data.columns !== undefined) {
            this.sortByOrder(data.columns)

            for (let item of data.columns) {
                if (item.isRequred) {
                    item.checked;
                }

                if (item.isUnique) {
                    item.checked;
                }
            }

        } else {
            this.referencesService.getColumns(this.idReferenceClick).subscribe((datas) => {
                data.columns = datas;
            });
        }

        this.indexColumn = index;
    }

    onClickItemReference(data) {
        data.open = !data.open;
        this.isLongBlock = true;
        for (let item of this.data[this.indexColumn].columns) {
            if (item.open) {
                this.isLongBlock = false;
            }
        }
    }

    changeSwap(item) {
        item.isRequred = !item.isRequred;
        this.referencesService.putEditColumn(item).subscribe();
    }

    changeNewSwap() {
        this.valueNewCheck = !this.valueNewCheck;
    }

    changeUniqSwap(item) {
        item.isUnique = !item.isUnique;

        let object = {
            id:item.id,
            referenceTypeId: item.referenceTypeId,
            name: item.name,
            isRequred: item.isRequred,
            isUnique: item.isUnique,
            columnTypeId: item.columnTypeId,
        }

        this.referencesService.putEditColumn(object).subscribe();
    }

    changeNewUniqSwap() {
        this.valueUniqNewCheck = !this.valueUniqNewCheck;
    }

    drop(event: CdkDragDrop<string[]>) {
        const prevId = this.data[this.indexColumn].id;
        moveItemInArray(
            this.data[this.indexColumn].columns,
            event.previousIndex,
            event.currentIndex
        );

        let massColumnSend = [];
        let index = 0;

        const saveDatas = this.data[this.indexColumn].columns;

        for (let item of saveDatas) {
            const itemObj = {
                id: item.id,
                columnOrder: index,
            }
            item.columnOrder = index;
            index++;
            massColumnSend.push(itemObj);
        }

        const object = {
            id: prevId,
            colunms: massColumnSend,
        }

        this.referencesService.orderColumnReference(object).subscribe();
    }

    sortByOrder(arr) {
        arr.sort((a, b) => a.columnOrder > b.columnOrder ? 1 : -1);
    }

    onPushBlockInReference(): void {
        this.isClickPushReference = true;
    }

    onPushBlockInRecord(): void {
        this.isClickPushRecord = true;
        this.isLongBlock = false;
    }

    onPushReference(): void {
        this.isClickPushReference = false;
        let object: IReferenceTypes = {
            name: this.newRecordInReference,
        };
        if (
            this.newRecordInReference.trim().length > 0 &&
            this.newRecordInReference !== undefined
        ) {
            this.referencesService.pushReference(object).subscribe((ans) => {
                this.data.push(ans);
            });
            this.newRecordInReference = null;
        }

    }

    onPushRecord(): void {
        this.isClickPushRecord = false;
        let object = {
            name: this.newFioRecord,
            referenceTypeId: this.idReferenceClick,
            isRequred: this.valueNewCheck,
            isUnique: this.valueUniqNewCheck,
            columnTypeId: 1,
        };
        if (this.newFioRecord.trim().length > 0 && this.newFioRecord !== undefined) {
            this.referencesService.pushColumnReference(object).subscribe(ans => {
                this.data[this.indexColumn].columns.push(ans);
            });
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

    deleteReference(item): void {
        this.referencesService.removeReference(item.id).subscribe();
        const indexDelete = this.data.indexOf(item);
        this.data.splice(indexDelete, 1);
    }

    deleteRecord(item): void {
        this.referencesService.removeRecord(item.id).subscribe();
        const indexDelete = this.data[this.indexColumn].columns.indexOf(item);
        this.data[this.indexColumn].columns.splice(indexDelete, 1);
    }

    onEdit(item): void { 
        item.openEdit = !item.openEdit;
    }


    editReference(item): void{
        this.referencesService.putEditRef(item).subscribe();
        item.openEdit = false;
    }

    editRecord(item): void{
        this.referencesService.putEditColumn(item).subscribe();
    }
}
