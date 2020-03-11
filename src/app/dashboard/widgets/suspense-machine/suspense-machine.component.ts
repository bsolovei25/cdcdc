import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { WidgetPlatform } from '../../models/widget-platform';

export interface ISuspenseMachine {
    date: Date;
    production: string;
    equipment: string;
    suspenseBreakpoint: string;
    suspenseDuration: number;
    suspenseCause: string;
    suspenseRelated: string;
}

@Component({
    selector: 'evj-suspense-machine',
    templateUrl: './suspense-machine.component.html',
    styleUrls: ['./suspense-machine.component.scss'],
})
export class SuspenseMachineComponent extends WidgetPlatform implements OnInit, OnDestroy {

    data: ISuspenseMachine[] = [
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: '№2 - ПГНПАКУ',
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая',
        },
    ];

    protected static itemCols: number = 20;
    protected static itemRows: number = 5;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'tools';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.items;
    }
}
