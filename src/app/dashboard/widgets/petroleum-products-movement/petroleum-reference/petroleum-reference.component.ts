import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';

@Component({
    selector: 'evj-petroleum-reference',
    templateUrl: './petroleum-reference.component.html',
    styleUrls: ['./petroleum-reference.component.scss'],
    animations: [
        trigger('leaveAnimation', [
            transition(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('1000ms', style({ transform: 'translateY(55%)' })),
            ]),
        ]),
        trigger('enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(20%)' }),
                animate('1000ms', style({ transform: 'translateY(0%)' })),
            ]),
        ]),
    ],
})
export class PetroleumReferenceComponent implements OnInit {
    @Input() typeScreen: string;

    @Input() updateParamBlock: boolean;

    @Output() exitBlock = new EventEmitter<boolean>();

    public title = [
        {
            name: 'Источник',
        },
        {
            name: 'Приемник',
        },
        {
            name: 'Продукт по источнику',
        },
        {
            name: 'Продукт по приемнику',
        },
        {
            name: 'Начало операции',
        },
        {
            name: 'Конец операции',
        },
        {
            name: 'Масса операции по источнику',
        },
        {
            name: 'Масса операции по приемнику',
        },
        {
            name: 'Отклонение',
        },
    ];

    public data = [
        {
            source: 'Резервуар 503',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {},
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 505',
            receiver: 'Резервуар 527',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
        {
            source: 'Резервуар 507',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                date: '02.09.2018',
                time: '0:01:01',
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                date: '02.09.2018',
                time: '0:02:00',
                operator: 'Иванов И.В.',
            },
            massSource: 47.32,
            massReceiver: 45.299,
            deviation: 2.021,
        },
    ];

    public data2 = {
        leftTable: [
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
        ],
        rightTable: [
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
            {
                name: 'Продукт',
                type: 'кг/м3',
                value: 0.5,
            },
        ],
    };

    objectKeys = Object.keys;
    objectEntries = Object.entries;

    constructor() {}

    ngOnInit() {}

    returnMenu() {
        // this.shortHeight = true;
        // this.updateParamBlock = false;
        // this.exitBlock.emit(true);
    }

    clickActive(item): void {
        item.active = !item.active;
    }
}
