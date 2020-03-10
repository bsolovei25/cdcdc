import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';
import { IOperation } from '../../../models/petroleum-products-movement.model';

@Component({
    selector: 'evj-petroleum-reference',
    templateUrl: './petroleum-reference.component.html',
    styleUrls: ['./petroleum-reference.component.scss'],
    animations: [
        trigger('leaveAnimation', [
            transition(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('200ms', style({ transform: 'translateY(60%)' })),
            ]),
        ]),
        trigger('enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(20%)' }),
                animate('200ms', style({ transform: 'translateY(0%)' })),
            ]),
        ]),
    ],
})
export class PetroleumReferenceComponent implements OnInit {
    @Input() typeScreen: string;

    @Input() updateParamBlock: boolean;

    @Output() exitBlock: EventEmitter<boolean> = new EventEmitter<boolean>();

    public title: string[] = [
        'Источник',
        'Приемник',
        'Продукт по источнику',
        'Продукт по приемнику',
        'Начало операции',
        'Конец операции',
        'Масса операции по источнику',
        'Масса операции по приемнику',
        'Отклонение',
    ];

    public operations: IOperation[] = [
        {
            source: 'Резервуар 503',
            receiver: 'ЭЛОУ-2',
            productSource: 'Нефть сырая',
            productReceiver: 'Нефть сырая',
            startOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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
                datetime: new Date(),
                operator: 'Иванов И.В.',
            },
            finishOperation: {
                datetime: new Date(),
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

    objectKeys: any = Object.keys;
    objectEntries: any = Object.entries;

    constructor() {}

    ngOnInit(): void {}

    returnMenu(): void {
        //   this.shortHeight = true;
        this.updateParamBlock = false;
        this.exitBlock.emit(true);
    }

    clickActive(item): void {
        item.active = !item.active;
    }
}
