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

    isLongBlock: boolean = true;

    indexColumn: number = null;

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
        return this.referencesService.getReference().subscribe((data) => {
            this.datas = data;
            this.data = this.datas;
            this.idReferenceClick = this.data[0].id; ///ПОДУМАТЬ ЕСЛИ РЕФЕРЕНС НЕ БУДЕТ
        })
    }

    getTable(id: number) {
        this.referencesService.getTableReference(id).subscribe((data) => {
            this.dataTable = data;
        })
    }

    onClickReference(data, index) {
        for (let item of this.data) {
            item.open = false;
        }

        this.getTable(data.id);

        data.open = true;
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
        item.checked = !item.checked;
    }

}
