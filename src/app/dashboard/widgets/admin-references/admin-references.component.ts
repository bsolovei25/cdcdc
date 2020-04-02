import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReferencesService } from '../../services/references.service';
import { IReferenceTypes, IReferenceColumnsType } from '../../models/references';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-admin-references',
    templateUrl: './admin-references.component.html',
    styleUrls: ['./admin-references.component.scss'],
})
export class AdminReferencesComponent extends WidgetPlatform implements OnInit, OnDestroy {
    static itemCols = 18;
    static itemRows = 14;

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

    saveColumns: any = [];

    public isType: number;

    types = {
        1: 'Текст',
        2: 'Число',
        3: 'Дата',
        4: 'Целое число'
    };

    public datas: IReferenceTypes[] = [

    ];

    public data: IReferenceTypes[] = [];

    public dataType: IReferenceColumnsType[] = [
        {
            id: 1,
            name: 'Tекст',
        },
        {
            id: 2,
            name: 'Число',
        },
        {
            id: 3,
            name: 'Дата',
        },
        {
            id: 4,
            name: 'Целое число',
        },
    ];

    constructor(
        public widgetService: WidgetService,
        public referencesService: ReferencesService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.getReference()
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        //this.data = ref.chartItems;
    }

    getReference() {
        return this.referencesService.reference$.subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
        })
    }


    onClickReference(data, index) {

        this.idReferenceClick = data.id;

        this.saveColumns = data.columns;


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
            id: item.id,
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
            columns: massColumnSend,
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
        if(this.idReferenceClick !== null && this.idReferenceClick !== undefined){
            this.isClickPushRecord = true;
            this.isLongBlock = false;
        }
       
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
            columnTypeId: this.isType,
        };
        if (this.newFioRecord.trim().length > 0 && this.newFioRecord !== undefined) {
            this.referencesService.pushColumnReference(object).subscribe(ans => {
                this.data[this.indexColumn].columns.push(ans);
               
            });
            this.newFioRecord = null;
            this.isType = null;
        }
        this.isLongBlock = true;
    }

    onChangeType(event) {
        this.isType = event.value.id;
    }

    searchReference(event: any) {
        const record = event.currentTarget.value.toLowerCase();
        const filterData = this.data.filter(
            (e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1
        );

        this.data = filterData;
        if (!event.currentTarget.value) {
            this.data = this.datas;
        }
    }

    searchRecords(event: any) {
        const record = event.currentTarget.value.toLowerCase();
        const filterData = this.data[this.indexColumn].columns.filter(
            (e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1
        );

        this.data[this.indexColumn].columns = filterData;
        if (!event.currentTarget.value) {
            this.data[this.indexColumn].columns = this.saveColumns;
        }
    }

    deleteReference(item): void {
        this.referencesService.removeReference(item.id).subscribe(ans => {
            const indexDelete = this.data.indexOf(item);
            this.data.splice(indexDelete, 1);
        });

    }

    deleteRecord(item): void {
        this.isLongBlock = true;
        this.referencesService.removeRecord(item.id).subscribe(ans => {
            const indexDelete = this.data[this.indexColumn].columns.indexOf(item);
            this.data[this.indexColumn].columns.splice(indexDelete, 1);
        });

    }

    onEdit(item): void {
        item.openEdit = !item.openEdit;
    }


    editReference(item): void {
        this.referencesService.putEditRef(item).subscribe();
        item.openEdit = false;
    }

    editRecord(item): void {
        this.referencesService.putEditColumn(item).subscribe();
    }
}
