import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import {} from '@angular/material/tree';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment';

export type valueType =
    | 'preparation'
    | 'passport-system'
    | 'shipment'
    | 'quality-stock'
    | 'substandard';

export type productType = 'gasoline' | 'product' | 'storage-tank';

interface IElement {
    id: number;
    title: string;
    parent?: number;
    objs: {
        dateTimeStart: Date;
        dateTimeEnd: Date;
        type: valueType;
        value: number;
        unit: string;
    }[];
}

interface IGAntt {
    dateTimeStart: Date;
    dateTimeEnd: Date;
    productType: productType;
    params: IElement[];
}

@Component({
    selector: 'evj-gantt-chart',
    templateUrl: './gantt-chart.component.html',
    styleUrls: ['./gantt-chart.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class GanttChartComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public title: string;
    public previewTitle: string = 'gantt-chart';
    static itemCols: number = 20;
    static itemRows: number = 16;

    modalWindow = {
        text: '',
        timePassportSystem: '',
        timeShipment: '',
    };

    dataSource = dataComp.params.filter((val) => !val.parent);
    columnsToDisplay: string[] = ['Продукт'];

    expandedElement;

    @ViewChild('modalWindow', { static: false }) modalWindowEl: ElementRef;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(id).subscribe((data) => {
            this.title = data.title;
        });
    }

    ngOnInit(): void {
        const arr = this.getDateArray(dataComp.dateTimeStart, dataComp.dateTimeEnd);
        this.columnsToDisplay.push(...arr);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    formatDate(date: Date): string {
        const dd = date.getDate();
        let mm = (date.getMonth() + 1).toString();
        if (Number(mm) < 10) {
            mm = '0' + mm;
        }
        return dd + '.' + mm;
    }

    getDateArray(start, end) {
        let arr = [];
        let dt = new Date(start);
        while (dt <= end) {
            arr.push(this.formatDate(new Date(dt)));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    getGantt(element: IElement, column: string, type: valueType) {
        let leftProcent: number;
        let dayProcent: number;

        if (column === 'Продукт') {
            return element.title;
        }
        element.objs.map((value) => {
            if (this.formatDate(value.dateTimeStart) === column && value.type === type) {
                switch (type) {
                    case 'passport-system':
                        [dayProcent, leftProcent] = this.getTimeDay(
                            value.dateTimeStart,
                            value.dateTimeEnd
                        );
                        break;
                    case 'preparation':
                        [dayProcent, leftProcent] = this.getTimeDay(
                            value.dateTimeStart,
                            value.dateTimeEnd
                        );
                        break;
                    case 'shipment':
                        [dayProcent, leftProcent] = this.getTimeDay(
                            value.dateTimeStart,
                            value.dateTimeEnd
                        );
                        break;
                    case 'quality-stock':
                        [dayProcent, leftProcent] = this.getTimeDay(
                            value.dateTimeStart,
                            value.dateTimeEnd
                        );
                        break;
                    case 'substandard':
                        [dayProcent, leftProcent] = this.getTimeDay(
                            value.dateTimeStart,
                            value.dateTimeEnd
                        );
                        break;
                    default:
                        break;
                }
            }
        });
        if (leftProcent) {
            return {
                width: `${dayProcent}%`,
                left: `${leftProcent}%`,
            };
        }
    }

    getTimeDay(timeStart: Date, timeEnd: Date) {
        const a = moment(timeStart);
        const b = moment(timeEnd);

        const allTime = b.diff(a, 'hours');
        const procentDay = (allTime / 24) * 100;
        const procentLeft = ((a.hours() !== 0 ? a.hours() : 0.01) / 24) * 100;
        return [procentDay, procentLeft];
    }

    getChildrenRows(el: IElement) {
        return dataComp.params.filter((val) => el.id === val.parent);
    }

    mouseOver(event: MouseEvent, element: IElement) {
        const ele = document.getElementById('modal-window').style;
        if (ele) {
            ele.display = 'block';
            ele.top = `${event.y + 8}px`;
            ele.left = `${event.x + 20}px`;
        }
        // this.modalWindow.timePassportSystem = element.objs
        //     .find((val) => val.type === 'passport-system')
        //     .value.toString();
    }

    mouseOut() {
        const ele = document.getElementById('modal-window').style;
        if (ele) {
            ele.display = 'none';
        }
    }
}

const dataComp: IGAntt = {
    dateTimeStart: new Date('2020-01-20T12:40:54'),
    dateTimeEnd: new Date('2020-01-29T12:40:54'),
    productType: 'product',
    params: [
        {
            id: 1,
            title: 'АИ-92',
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T12:40:54'),
                    dateTimeEnd: new Date('2020-01-20T18:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T18:40:54'),
                    dateTimeEnd: new Date('2020-01-20T20:40:54'),
                    type: 'passport-system',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
        {
            id: 2,
            title: 'АИ-92 доп.т',
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T05:40:54'),
                    dateTimeEnd: new Date('2020-01-20T15:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T15:40:54'),
                    dateTimeEnd: new Date('2020-01-20T20:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-21T12:40:54'),
                    dateTimeEnd: new Date('2020-01-21T18:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
        {
            id: 3,
            title: 'АИ-95',
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T05:40:54'),
                    dateTimeEnd: new Date('2020-01-20T15:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T15:40:54'),
                    dateTimeEnd: new Date('2020-01-20T20:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-21T12:40:54'),
                    dateTimeEnd: new Date('2020-01-21T18:40:54'),
                    type: 'quality-stock',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
        {
            id: 4,
            title: 'АИ-98',
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T01:40:54'),
                    dateTimeEnd: new Date('2020-01-20T22:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T22:40:54'),
                    dateTimeEnd: new Date('2020-01-20T23:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
        {
            id: 4,
            title: 'G-DRIVE 100',
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T10:40:54'),
                    dateTimeEnd: new Date('2020-01-20T15:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T15:40:54'),
                    dateTimeEnd: new Date('2020-01-20T20:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-21T00:40:54'),
                    dateTimeEnd: new Date('2020-01-21T05:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-21T05:40:54'),
                    dateTimeEnd: new Date('2020-01-21T12:40:54'),
                    type: 'quality-stock',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
        {
            id: 5,
            title: 'P-19',
            parent: 1,
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T00:40:54'),
                    dateTimeEnd: new Date('2020-01-20T05:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T15:40:54'),
                    dateTimeEnd: new Date('2020-01-20T20:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-21T12:40:54'),
                    dateTimeEnd: new Date('2020-01-21T18:40:54'),
                    type: 'quality-stock',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
        {
            id: 6,
            title: 'P-20',
            parent: 1,
            objs: [
                {
                    dateTimeStart: new Date('2020-01-20T00:40:54'),
                    dateTimeEnd: new Date('2020-01-20T05:40:54'),
                    type: 'preparation',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-20T15:40:54'),
                    dateTimeEnd: new Date('2020-01-20T20:40:54'),
                    type: 'shipment',
                    value: 200,
                    unit: 'тонн',
                },
                {
                    dateTimeStart: new Date('2020-01-21T12:40:54'),
                    dateTimeEnd: new Date('2020-01-21T18:40:54'),
                    type: 'quality-stock',
                    value: 200,
                    unit: 'тонн',
                },
            ],
        },
    ],
};
