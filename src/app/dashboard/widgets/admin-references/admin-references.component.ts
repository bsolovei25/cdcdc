import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
    selector: 'evj-admin-references',
    templateUrl: './admin-references.component.html',
    styleUrls: ['./admin-references.component.scss'],
})
export class AdminReferencesComponent implements OnInit {
    private subscriptions: Subscription[] = [];

    static itemCols = 18;
    static itemRows = 14;

    public code: string;
    public title: string;
    public units: string = ' ';
    public previewTitle: string = 'circle-diagram';
    public options;

    isReference: boolean = false;
    referencesOn = 0;
    massCheck = [];

    inputClickRef: boolean = false;
    inputClickName: boolean = false;

    isChangeName: boolean = false;

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

    onRefInputClick(){
        this.inputClickRef = true;
        this.inputClickName = false;
    }

    onNameInputClick(){
        this.inputClickRef = false;
        this.inputClickName = true;
    }

    onClickReference(data) {
        let index = 0;
        this.isReference = !this.isReference;
        for (let i of this.data) {
            index++;
            if (i === data) {
                if (!this.isReference) {
                    this.massCheck = [];
                } else {
                    this.referencesOn = index - 1;
                    this.massCheck.push(i);
                }
            }
        }
    }

    onChangeName(){
        this.isChangeName = !this.isChangeName;
    }
}
