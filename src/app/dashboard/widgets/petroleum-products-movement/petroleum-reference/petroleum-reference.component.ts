import { Component, OnInit, Input } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';

@Component({
    selector: 'evj-petroleum-reference',
    templateUrl: './petroleum-reference.component.html',
    styleUrls: ['./petroleum-reference.component.scss'],
    animations: [
        trigger(
            'leaveAnimation', [
              transition(':leave', [
                style({transform: 'translateY(0%)'}),
                animate('2000ms', style({transform: 'translateY(468px)'}))
              ])
            ]
            
          ),
        trigger(
            'enterAnimation', [
              transition(':enter', [
                style({transform: 'translateY(20%)'}),
                animate('2000ms', style({transform: 'translateY(0%)'}))
              ])
            ]
            
          ),
    ]
})
export class PetroleumReferenceComponent implements OnInit {
    @Input() shortHeight: boolean;

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

    objectKeys = Object.keys;
    objectEntries = Object.entries;

    constructor() {}

    ngOnInit() {
    }
}
