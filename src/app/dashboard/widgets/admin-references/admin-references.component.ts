import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IReferenceTypes, IReferenceColumnsType } from '../../models/references';
import { WidgetPlatform } from '../../models/widget-platform';
import { Subscription } from 'rxjs';
import { ReferencesService } from '../../services/widgets/references.service';

@Component({
    selector: 'evj-admin-references',
    templateUrl: './admin-references.component.html',
    styleUrls: ['./admin-references.component.scss'],
})
export class AdminReferencesComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('adminRefereneTable') public testBlock: ElementRef;

    static itemCols = 32;
    static itemRows = 15;

    public static minItemCols: number = 29;
    public static minItemRows: number = 13;

    isLoading: boolean = false;

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

    public allFileTree: any;

    types = {
        'typeString': 'Текст',
        'typeInt': 'Число',
        'typeDateTime': 'Дата',
    };

    public datas: IReferenceTypes[] = [];

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
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        if (this.data?.length > 0) {
            this.blockNeed();
            this.setStyleScroll();
        }
    }

    setStyleScroll(): void {
        const rightScroll = document.getElementById('rightScrollAdmRef');
        const leftScroll = document.getElementById('leftScrollAdmRef');
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

    ngOnInit(): void {
        super.widgetInit();
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

    getReference(): Subscription {
        return this.referencesService.getReference().subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
            this.setStyleScroll();
        });
    }


    onClickReference(data, index) {
        if (this.indexColumn !== undefined && this.indexColumn !== null) {
            for (let item of this.data[this.indexColumn].columns) {
                if (item.open) {
                    item.open = false;
                }
            }
        }
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
            this.setStyleScroll();

        } else {
            this.referencesService.getColumns(this.idReferenceClick).subscribe((datas) => {
                data.columns = datas;
                this.blockNeed();
                this.setStyleScroll();
            });
        }

        this.setStyleScroll();
    }

    onClickItemReference(data) {
        this.setStyleScroll();
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
        // let index = 0;

        const saveDatas = this.data[this.indexColumn].columns;

        saveDatas.forEach((item, index) => {
            const itemObj = {
                id: item.id,
                columnOrder: index,
            };
            item.columnOrder = index;
            massColumnSend.push(itemObj);
        });

        const object = {
            id: prevId,
            columns: massColumnSend,
        };

        this.referencesService.orderColumnReference(object).subscribe();
    }

    sortByOrder(arr): void {
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
        this.isLoading = true;
        this.isClickPushReference = false;
        const object: IReferenceTypes = {
            name: this.newRecordInReference,
        };
        if (this.newRecordInReference?.trim().length > 0) {
            this.referencesService.pushReference(object).subscribe((ans) => {
                this.isLoading = false;
                this.referencesService.getRestReference();
                this.data.push(ans);
            });
            this.newRecordInReference = null;
        }
    }

    onPushRecord(): void {
        this.isClickPushRecord = false;
        if (this.newFioRecord) {
            const object = {
                name: this.newFioRecord,
                referenceTypeId: this.idReferenceClick,
                isRequred: this.valueNewCheck,
                isUnique: this.valueUniqNewCheck,
                columnTypeId: this.isType,
            };
            if (this.newFioRecord?.trim().length > 0) {
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

    onChangeType(event): void {
        this.isType = event.value.type;
    }

    searchReference(event: any): void {
        if (event.key === 'Backspace') {
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

    searchRecords(event: any): void {
        if (event.key === 'Backspace') {
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
        this.referencesService.removeRecord(item.id).subscribe((ans) => {
            this.referencesService.getRestReference();
            const indexDelete = this.data[this.indexColumn].columns.indexOf(item);
            this.data[this.indexColumn].columns.splice(indexDelete, 1);
        }, (error) => {
            this.deleteColumn(item);
        }
        );

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
        if (this.data[this.indexColumn] !== undefined) {
            if (this.data[this.indexColumn].columns !== undefined) {
                const heightTemplate = this.data[this.indexColumn].columns?.length * 40;
                const heihtOut = (this.testBlock.nativeElement.clientHeight - heightTemplate) / 40;
                for (let i = 0; i < heihtOut - 1; i++) {
                    this.blockOut.push(i);
                }
            }
        }
    }

    public deleteColumn(item): void {
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить столбец с данными?',
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.referencesService.removeRecordWithColumn(item.id).subscribe(ans => {
                this.referencesService.getRestReference();
                const indexDelete = this.data[this.indexColumn].columns.indexOf(item);
                this.data[this.indexColumn].columns.splice(indexDelete, 1);
            }),
            closeFunction: () => this.referencesService.closeAlert(),
        };
        this.referencesService.alertWindow$.next(windowsParam);
    }
}
