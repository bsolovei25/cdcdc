import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

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

    ngOnInit(): void {}

    ngOnDestroy() {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    onClickReference(data) {
        data.open = !data.open;
    }

    onClickItemReference(data) {
        data.open = !data.open;
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

    onClickTitle(item:string):void{
        if (item === "fio"){
            this.clickFio = true;
            this.clickDate = false;
        } else if( item === "date"){
            this.clickFio = false;
            this.clickDate = true;
         
        }
    }
}
