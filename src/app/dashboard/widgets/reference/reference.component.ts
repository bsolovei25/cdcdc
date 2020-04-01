import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { IReferenceTypes } from '../../models/references';
import { ReferencesService } from '../../services/references.service';
import { ItemSizeAverager } from '@angular/cdk-experimental/scrolling';

@Component({
    selector: 'evj-reference',
    templateUrl: './reference.component.html',
    styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent implements OnInit, OnDestroy {
    //objectKeys = Object.keys;

    private subscriptions: Subscription[] = [];

    static itemCols = 18;
    static itemRows = 14;

    public code: string;
    public title: string;
    public units: string = ' ';
    public previewTitle: string = 'default';
    public options;

    public valueCheck: boolean;
    public valueUniqCheck: boolean;

    public clickFio: boolean = true;
    public clickDate: boolean = false;

    public isAddBlockRecord: boolean = false;

    isLongBlock: boolean = true;

    indexColumn: number = null;

    public newName: string;

    public data: IReferenceTypes[] = [
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
                    columnTypeId: 1,
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

    public datas: IReferenceTypes[] = [];

    public dataTable: any = []; //// НАПИСАТЬ МОДЕЛЬКУ

    public idReferenceClick: number;

    public columnObject = [];

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

    ngOnInit(): void {
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
        return this.referencesService.reference$.subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
          //  this.idReferenceClick = this.data[0].id; ///ПОДУМАТЬ ЕСЛИ РЕФЕРЕНС НЕ БУДЕТ
        })
    }

    getTable(id: number) {
        this.referencesService.getTableReference(id).subscribe((data) => {
            this.dataTable = data;
        })
    }

    onClickReference(data, index) {
        this.idReferenceClick = data.id;
        this.isLongBlock = true;
        this.isAddBlockRecord = false;

        this.indexColumn = index;

        this.getTable(data.id);
    }

    onClickItemReference(data) {
        data.open = !data.open;

        this.isLongBlock = true;
        for (let item of this.dataTable.data) {
            if (item.open) {
                this.isLongBlock = false;
            }
        }
    }

    changeSwap(item) {
        item.checked = !item.checked;
    }

    onAddBlockRecord() {
        this.isAddBlockRecord = true;
        this.isLongBlock = false;
    }

    onPushRecord() {
        this.isAddBlockRecord = false;
        this.isLongBlock = true;
        let index = 0;
        let columnsObj = [];
        let obj: any = [];
        for (let i of this.data[this.indexColumn].columns) {
            if (i.name !== 'Id' && i.name !== 'Name') {
                let test;
                this.columnObject.find(e =>  {
                    if(e.idColumn === i.id){
                        test = e.value;
                    }
                }
                 );
                 (test === undefined) ? test = null : test = test;
                if (i.columnTypeId === 2) {
                    obj = {
                        referenceColumnId: i.id,
                        valueString: null,
                        valueDateTime: null,
                        valueNumber: +test,
                        valueInt: null
                    }
                } else if (i.columnTypeId === 1) {
                    obj = {
                        referenceColumnId: i.id,
                        valueString: test,
                        valueDateTime: null,
                        valueNumber: null,
                        valueInt: null
                    }
                }

                columnsObj.push(obj);
                index++;
            }

        }
        let object = {
            name: this.newName,
            referenceTypeId: this.idReferenceClick,
            columnsData: columnsObj,
        };

      
        this.referencesService.pushReferenceData(object).subscribe(ans => {
            this.dataTable.data.push(object);
            this.columnObject = [];
            this.newName = null;
        });

    }

    onChangeValue(event, id) {
        const obj = {
            idColumn: id,
            value: event.currentTarget.value,
        }
        this.columnObject.push(obj);
    }

    deleteRecord(item): void {
        this.referencesService.removeDataRecord(item.id).subscribe(ans => {
            const indexDelete = this.dataTable.data.indexOf(item);
            this.dataTable.data.splice(indexDelete, 1);
        });

    }

}
