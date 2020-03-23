import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

    data = [
        {
            name: 'Установка НПЗ',
            referenceFIO: [
                {
                    name: 'Пупкин Иван Петрович',
                },
                {
                    name: 'Пупкин Иван Петрович',
                },
                {
                    name: 'Пупкин Иван Петрович',
                },
            ],
        },
        {
            name: 'Производственный персонал',
            referenceFIO: [
                {
                    name: 'Горохов Иван Петрович',
                },
                {
                    name: 'Горохов Иван Петрович',
                },
                {
                    name: 'Горохов Иван Петрович',
                },
            ],
        },
        {
            name: 'Климатические параметры',
            referenceFIO: [
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
                {
                    name: 'Сардыков Иван Петрович',
                },
            ],
        },
    ];

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
    }

    ngOnInit() {}

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

    onClickReference(data) {
        data.open = !data.open;
    }

    onClickItemReference(data) {
        data.open = !data.open;
    }

    onChangeName() {
        this.isChangeName = !this.isChangeName;
    }

    changeSwap() {
        let check = <HTMLInputElement>document.getElementById('checkBoxValue');
        if (check.checked) {
            this.valueCheck = false;
        } else {
            this.valueCheck = true;
        }
    }

    changeUniqSwap() {
        let check = <HTMLInputElement>document.getElementById('checkBoxUniqValue');
        if (check.checked) {
            this.valueUniqCheck = false;
        } else {
            this.valueUniqCheck = true;
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.data, event.previousIndex, event.currentIndex);
      
    }

    onClickEditReference(item): void{

    }

    onClickDeleteReference(item): void{

    }
}
