import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';

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
export class PetroleumReferenceComponent {
    @Input() typeScreen: string;
    @Input() data: any;

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

    public keys: string[] = [
        'sourceName',
        'destinationName',
        'sourceProduct',
        'destinationProduct',
        'startTime',
        'endTime',
        'sourceMass',
        'destinationMass',
        'deltaMass',
    ];
}
