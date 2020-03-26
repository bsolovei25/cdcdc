import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { IReferenceTypes } from '../../models/references';
import { NewWidgetService } from '../../services/new-widget.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'evj-report-server-configurator',
    templateUrl: './report-server-configurator.component.html',
    styleUrls: ['./report-server-configurator.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class ReportServerConfiguratorComponent implements OnInit, OnDestroy {
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

    public addMenuClick: boolean = false;

    public activeReference: number;

    isLongBlock: boolean = true;

    indexColumn: number = 0;

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
                {
                    id: 3,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: '3',
                    columnTypeId: 1,
                    columnName: 'Дата рождения',
                    isRequred: false,
                    isUnique: true,
                },
                {
                    id: 4,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: '4',
                    columnTypeId: 1,
                    columnName: 'Дата рождения',
                    isRequred: false,
                    isUnique: true,
                },
                {
                    id: 5,
                    createdAt: new Date(),
                    createdBy: new Date(),
                    referenceTypeId: 1,
                    name: '5',
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

    public clickPushRef: boolean = false;
    public clickPushRec: boolean = false;

    newRecord: string;
    newFolder: string;

    public connectedTo: any = [];

    public saveDate: any = [];

    constructor(
        public widgetService: NewWidgetService,
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

        for (let item of this.data) {
            this.connectedTo.push(item.name);
        }
    }

    ngOnInit(): void {
        this.saveDate = this.data;
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    onClickReference(data, index) {
        data.open = !data.open;
        this.indexColumn = index;
        this.activeReference = data.id;
    }

    onClickItemReference(data) {
        data.open = !data.open;
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    onShowItem(item): void {
        item.open = !item.open;
    }

    addMenu() {
        this.addMenuClick = !this.addMenuClick;
    }

    changeSwap(item): void {
        ////ОПТИМИЗИРОВАТЬ (!!!!)
        let index1 = 0;
        let index2 = 0;
        let index3 = 0;
        let index4 = 0;
        let index5 = 0;
        this.data.find((el) => {
            el.columns.find((e) => {
                if (e === item) {
                    e.isRequred = !e.isRequred;
                    index3 = index2;
                    index4 = index1;
                }
                index2++;
            });
            index1++;
            index2 = 0;
        });

        for (let item of this.data[index4].columns) {
            if (item.isRequred) {
                index5++;
            }
        }

        if (this.data[index4].columns[index3].isRequred === true) {
            this.data[index4].columns.splice(index3, 1);
            this.data[index4].columns.splice(index5 - 1, 0, item);
        } else if (this.data[index4].columns[index3].isRequred === false) {
            this.data[index4].columns.splice(index3, 1);
            this.data[index4].columns.push(item);
        }
    }

    pushBlockInRef(): void {
        this.clickPushRef = true;
        this.addMenuClick = false;
    }

    pushBlockInRec(): void {
        this.clickPushRec = true;
        this.addMenuClick = false;
    }

    onPushReference(): void {
        this.clickPushRef = false;
        const object = {
            name: this.newFolder,
        };
        if (this.newFolder.trim().length > 0 && this.newFolder !== undefined) {
            this.data.push(object);
            this.newFolder = null;
        }
    }

    onPushRecord(): void {
        this.clickPushRec = false;
        const object = {
            name: this.newRecord,
            referenceTypeId: 2,
            isRequred: false,
            isUnique: false,
            columnTypeId: 1,
        };
        if (this.newRecord.trim().length > 0 && this.newRecord !== undefined) {
            this.data[this.indexColumn].columns.push(object);
            this.newRecord = null;
        }
    }
}
