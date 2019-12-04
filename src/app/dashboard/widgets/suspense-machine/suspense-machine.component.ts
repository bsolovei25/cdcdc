import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { EventService } from '../../services/event.service';


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
    selector: "evj-suspense-machine",
    templateUrl: "./suspense-machine.component.html",
    styleUrls: ["./suspense-machine.component.scss"]
})
export class SuspenseMachineComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    isLoading: boolean = false;

    public title = 'Простой установки';

    data: ISuspenseMachine[] = [
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
        {
            date: new Date('2019-11-01T12:01:05'),
            production: "№2 - ПГНПАКУ",
            equipment: 'КПА-200',
            suspenseBreakpoint: '10',
            suspenseDuration: 0.2,
            suspenseCause: 'КИП',
            suspenseRelated: 'Технологическая'
        },
    ]

    static itemCols = 20;
    static itemRows = 5;

    constructor(
        private eventService: EventService,
        @Inject("isMock") public isMock: boolean,
        @Inject("widgetId") public id: string
    ) {
    }

    ngOnInit() {

        if (!this.isMock) {
            this.subscription = this.eventService.event$.subscribe((value) => {
                if (value) {
                    this.isLoading = true;

                    this.isLoading = false;
                }
            })
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
