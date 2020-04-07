import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
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
    @ViewChild('adminRefereneTable') public testBlock: ElementRef;

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

    public blockOut = [];

    public isType: string;

    types = {
        'typeString': 'Текст',
        'typeInt': 'Число',
        'typeDateTime': 'Дата',
    };

    public datas: IReferenceTypes[] = [

    ];

    public data: IReferenceTypes[] = [];

    public dataType: IReferenceColumnsType[] = [
        {
            type: 'typeString',
            name: 'Tекст',
        },
        {
            type: 'typeInt',
            name: 'Число',
        },
        {
            type: 'typeDateTime',
            name: 'Дата',
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
        this.widgetIcon = 'reference';
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        if (this.data !== undefined && this.data.length > 0) {
            this.blockNeed();
        }
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
        return this.referencesService.getReference().subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
        });
    }


    onClickReference(data, index) {
        this.idReferenceClick = data.id;
        this.saveColumns = data.columns;
        this.indexColumn = index;

        if (data.columns !== null && data.columns !== undefined) {
            this.sortByOrder(data.columns);
            this.blockNeed();

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
                this.blockNeed();
            });
        }
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
        if (this.idReferenceClick !== null && this.idReferenceClick !== undefined) {
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
                this.referencesService.getRestReference();
                this.data.push(ans);
            });
            this.newRecordInReference = null;
        }

    }

    onPushRecord(): void {
        this.isClickPushRecord = false;
        if (this.newFioRecord !== undefined) {
            let object = {
                name: this.newFioRecord,
                referenceTypeId: this.idReferenceClick,
                isRequred: this.valueNewCheck,
                isUnique: this.valueUniqNewCheck,
                columnTypeId: this.isType,
            };
            if (this.newFioRecord.trim().length > 0) {
                this.referencesService.pushColumnReference(object).subscribe(ans => {
                    this.referencesService.getRestReference();
                    this.data[this.indexColumn].columns.push(ans);
                    this.blockNeed();
                });
                this.newFioRecord = null;
                this.isType = null;
            }
        }
        this.isLongBlock = true;
    }

    onChangeType(event) {
        this.isType = event.value.type;
    }

    searchReference(event: any) {
        if (event.key === "Backspace") {
            this.data = this.datas;
        }
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
        if (event.key === "Backspace") {
            this.data[this.indexColumn].columns = this.saveColumns;
        }
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
            this.referencesService.getRestReference();
            const indexDelete = this.data.indexOf(item);
            this.data.splice(indexDelete, 1);
        });

    }

    deleteRecord(item): void {
        this.isLongBlock = true;
        this.referencesService.removeRecord(item.id).subscribe(ans => {
            this.referencesService.getRestReference();
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

    blockNeed(): void {
        this.blockOut = [];
        if (this.data[this.indexColumn].columns !== undefined) {
            const heightTemplate = this.data[this.indexColumn].columns?.length * 40;
            const heihtOut = (this.testBlock.nativeElement.clientHeight - heightTemplate) / 40;
            for (let i = 0; i < heihtOut - 1; i++) {
                this.blockOut.push(i);
            }
        }
    }
}
